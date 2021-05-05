<template>
  <div>
    <!--    <BootstrapDatatable :posts="posts" />-->
    <!--    <MapContainer ref="map_container"></MapContainer>-->
    <title_bar></title_bar>
    <Map-container_leafletjs ref="map_container_leafletjs" style="width: 100%; height: 500px;"></Map-container_leafletjs>
    <VuetifyDatatable :posts="display_data" />

  </div>
</template>

<script>
// import BootstrapDatatable from "./components/BootstrapDatatable";
import VuetifyDatatable from "./components/VuetifyDatatable";
// import MapContainer from "./components/openlayers_map"
import axios from 'axios';
import MapContainer_leafletjs from "./components/leafletjs_map";
import title_bar from "@/components/title_bar";

export default {
  metaInfo: {
    title: 'SUSTech Next Bus',
    titleTemplate: '%s',
    htmlAttrs: {
      lang: 'en',
      amp: false
    }
  },

  name: "App",

  components: {
    title_bar,
    VuetifyDatatable,
    // MapContainer,
    // eslint-disable-next-line vue/no-unused-components
    MapContainer_leafletjs
  },


  data: () => ({
    bus_remote: [],
    bus_remote2: [],
    timetable_jhl_rsb_workday: [],
    lut_up: [],
    lut_down: [],
    current_seconds: 0,
    sta_num_up: 0,
    sta_num_down: 95,
    stations: [{"no":0,"sta":"COE","up":0,"down":95,"name":"工学院 College of Engineering","name_cn":""},{"no":1,"sta":"RSB","up":9,"down":85,"name":"科研楼 Research Building","name_cn":""},{"no":2,"sta":"GA7","up":15,"down":79,"name":"7号门 Gate 7","name_cn":""},{"no":3,"sta":"ADM","up":21,"down":71,"name":"行政楼 Administration Building","name_cn":""},{"no":4,"sta":"GA1","up":31,"down":62,"name":"1号门 Gate 1","name_cn":""},{"no":5,"sta":"GA3","up":45,"down":48,"name":"3号门 Gate 3","name_cn":""},{"no":6,"sta":"FAP","up":53,"down":40,"name":"专家公寓 Guest Houses","name_cn":""},{"no":7,"sta":"FCT","up":57,"down":36,"name":"教工食堂 Faculty Cafeteria","name_cn":""},{"no":8,"sta":"CHC","up":60,"down":33,"name":"社康中心 Community Health Service","name_cn":""},{"no":9,"sta":"SDT","up":66,"down":28,"name":"学生宿舍 Student Dormitory","name_cn":""},{"no":10,"sta":"HYU1","up":83,"down":14,"name":"慧园 (下) Hui Yuan (D)","name_cn":""},{"no":11,"sta":"LHH","up":98,"down":23,"name":"荔园 Lychee Hill","name_cn":""},{"no":12,"sta":"CYU","up":89,"down":19,"name":"创园 Chuang Yuan","name_cn":""},{"no":13,"sta":"HYU2","up":111,"down":14,"name":"慧园 (上) Hui Yuan (U)","name_cn":""},{"no":14,"sta":"JHL","up":124,"down":1,"name":"欣园 Joy Highland","name_cn":""}],
    display_data: [],
    map_display_data: [],
    workday_indicator: [1],
    query_string_sta: {"no":0,"sta":"COE","up":0,"down":95,"name":"工学院 College of Engineering","name_cn":""},
    countdown_timer: 10,
    bus_direction_data: [{"no": 0, "dest": "欣园 Joy Highland"},{"no": 1, "dest": "工学院 COE"}]
  }),
  async created() {
    await this.set_station();


    const realtime_location_data = await axios.get(`https://bus.sustcra.com/api/v1/bus/timetable/`)
    //need judge the workday/holiday
    this.workday_indicator = await axios.get(`https://bus.sustcra.com/sample/workday.txt`).data
    let timetable_up;
    let timetable_down;
    if(this.workday_indicator == 1){
      timetable_up = await axios.get(`https://bus.sustcra.com/sample/timetable-jhl-rsb-workday.json`)
      timetable_down = await axios.get(`https://bus.sustcra.com/sample/timetable-rsb-jhl-workday.json`)
    } else {
      timetable_up = await axios.get(`https://bus.sustcra.com/sample/timetable-rsb-jhl-holiday.json`)
      timetable_down = await axios.get(`https://bus.sustcra.com/sample/timetable-jhl-rsb-holiday.json`)
    }
    


    const lut_up_remote = await axios.get(`https://bus.sustcra.com/sample/lut-up.json`)
    const lut_down_remote = await axios.get(`https://bus.sustcra.com/sample/lut-down.json`)
    //const stations_remote = await axios.get(`https://bus.sustcra.com/sample/stations.json`)
    this.bus_remote2 = realtime_location_data.data;
    this.timetable_up_workday = timetable_up.data;
    this.timetable_down_workday = timetable_down.data;
    this.lut_up = lut_up_remote.data;
    this.lut_down = lut_down_remote.data;
    //this.stations = stations_remote.data;



    await this.changestatus()
    // this.$refs.map_container.add_bus_to_map(this.map_display_data)
    this.$refs.map_container_leafletjs.add_marker(this.map_display_data);

    this.periodically();



  },
  methods: {
    async fetchdata() {
      const realtime_location_data = await axios.get(`https://bus.sustcra.com/api/v1/bus/timetable/`)
      this.bus_remote2 = realtime_location_data.data;
      // this.changestatus();

    },
    changestatus: function() {

      //init
      this.display_data = [];
      //this.bus_remote2 = this.bus_remote[0]
      let i;
      for (i = 0; i < this.bus_remote2.length; i++) {
        if (this.bus_remote2[i].tag > 0 && this.bus_remote2[i].depart_seconds < 1500){
          this.bus_remote2[i].imei = '在途中 On the way'
          // console.log(this.bus_remote2[i].imei)
          // var date = new Date(0);
          // date.setSeconds(this.bus_remote2[i].depart_time);
          // this.bus_remote2[i].depart_time = date.toISOString().substr(11, 8)
          this.display_data.push(this.bus_remote2[i])
        }
      }


      var current_time = new Date();
      var current_seconds = current_time.getSeconds() + current_time.getMinutes()*60 + current_time.getHours()*3600;
      this.current_seconds = current_seconds
      var date = new Date(0);
      //console.log(current_seconds)
      //test sample
      //current_seconds = 39600

      //station selector




      //add eta to array
      let j;
      // console.log("this.display_data")
      // console.log(this.display_data)
      //
      for (j = 0; j < this.display_data.length; j++) {
        var eta = 0;
        if (this.display_data[j].direction === 1){
          eta = this.lut_up[this.sta_num_up].time - this.lut_up[this.display_data[j].ctrl_point].time
        }
        if (this.display_data[j].direction === 2){

          eta = this.lut_down[this.sta_num_down].time - this.lut_down[this.display_data[j].ctrl_point].time
        }
        this.display_data[j].eta = eta


      }

      this.map_display_data = this.display_data
      console.log("map_display_data defined")



      //add scheduled bus
      // this.get_scheduled_bus(1,this.timetable_up_workday)
      // this.get_scheduled_bus(2,this.timetable_down_workday)


      //delete negative time, add directions

      let l;
      let temp1 = []
      for (l = 0; l < this.display_data.length; l++) {
        if (this.display_data[l].eta < 0){
          //console.log(l)
        } else {
          if (this.display_data[l].direction === 1) {
            this.display_data[l].direction_text = "往欣园 TO JOY HIGHLAND";
          }
          if (this.display_data[l].direction === 2) {
            this.display_data[l].direction_text = "往工学院 TO COE";
          }
          if (this.display_data[l].peak_line === 1){
            this.display_data[l].peak_text = "高峰 PEAK"
          }
          if (this.display_data[l].peak_line === 0){
            this.display_data[l].peak_text = "平峰 NORMAL"
          }

          //add min to eta
          this.display_data[l].eta_text = Math.round(this.display_data[l].eta/60) + " min."

          //convert dept time to human format
          //console.log(this.display_data[l].depart_time)
          date = new Date(0);
          date.setSeconds(this.display_data[l].depart_time);
          this.display_data[l].depart_time_text = date.toISOString().substr(11, 8)


          temp1.push(this.display_data[l])
        }
      }

      this.display_data = temp1;


      console.log(this.display_data)
      //this.filter_direction()

    },
    get_scheduled_bus: function(direction, timetable){
      let k;
      for (k = 0; k < timetable.length; k++) {

        if ((timetable[k].time_sec - this.current_seconds < 2400) && (timetable[k].time_sec - this.current_seconds > -10)){
          //console.log("find a NYD bus" + timetable[k].time_sec)
          var scheduled_bus = {};
          scheduled_bus.depart_time = timetable[k].time_sec
          scheduled_bus.imei = "未发车 Not Departure Yet"
          scheduled_bus.tag = 2
          scheduled_bus.direction = direction
          if (timetable[k].peak === 1) {
            scheduled_bus.peak_line = 1
          }
          if (timetable[k].peak === 0) {
            scheduled_bus.peak_line = 0
          }
          if (direction === 1) {
            scheduled_bus.eta = this.lut_up[this.sta_num_up].time + (timetable[k].time_sec - this.current_seconds)
          }
          if (direction === 2) {
            scheduled_bus.eta = this.lut_down[this.sta_num_down].time + (timetable[k].time_sec - this.current_seconds)
          }
          this.display_data.push(scheduled_bus)
        }

      }
    },
    async changestation(sta_no) {
      this.sta_num_up = this.stations[sta_no].up;
      this.sta_num_down = this.stations[sta_no].down;
      console.log("numup" + this.sta_num_up + "numdown" + this.sta_num_down)
      await this.refresh();
    },
    async refresh() {
      await this.fetchdata();
      await this.changestatus();
      //this.$refs.map_container.clean_bus()
      // this.$refs.map_container.add_bus_to_map(this.map_display_data)
      //leaflet
      await this.$refs.map_container_leafletjs.add_marker(this.map_display_data);
      this.countdown_timer = 10;

    },
    periodically: function () {
      if(this.countdown_timer > 0) {
        setTimeout(() => {
          this.countdown_timer -= 1
          this.periodically();

        }, 1000)
      } else {
        this.refresh();
        this.countdown_timer = 10;
        this.periodically();
      }


    },
    async set_station() {
      //set station by query string
      // eslint-disable-next-line no-constant-condition



        //console.log(this.stations)
      let i;
      for (i=0; i < this.stations.length; i++) {

        if (this.stations[i].sta.toString() === this.$route.query.station) {
          //console.log(this.$route.query.sta)

          this.sta_num_up = this.stations[i].up;
          this.sta_num_down = this.stations[i].down;
          this.query_string_sta.name = this.stations[i].name;
          this.query_string_sta.no = this.stations[i].no;

        }
      }
      //  console.log(this.query_string_sta.no)
      //this.refresh();


    },
    async filter_direction() {
      console.log(this.$route.query.direction)
      if (this.$route.query.direction >0){
        var dir_id = [this.$route.query.direction]

        var filteredArray = this.display_data.filter(function(itm){
          return dir_id.indexOf(itm.direction) > -1;
        });
        filteredArray = { records : filteredArray };
        this.display_data = filteredArray
        }

      }

    }



};


</script>