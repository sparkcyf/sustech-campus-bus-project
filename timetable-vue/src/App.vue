<template>
  <div>
<!--    <BootstrapDatatable :posts="posts" />-->
<!--    <MapContainer ref="map_container"></MapContainer>-->
    <Map-container_leafletjs ref="map_container_leafletjs"></Map-container_leafletjs>
    <VuetifyDatatable :posts="display_data" />

  </div>
</template>

<script>
// import BootstrapDatatable from "./components/BootstrapDatatable";
import VuetifyDatatable from "./components/VuetifyDatatable";
// import MapContainer from "./components/openlayers_map"
import axios from 'axios';
import MapContainer_leafletjs from "./components/leafletjs_map";

export default {
  name: "App",

  components: {
    VuetifyDatatable,
    // MapContainer,
    // eslint-disable-next-line vue/no-unused-components
    MapContainer_leafletjs
  },


  data: () => ({
    posts: [
      {
        userId: 1,
        id: 1,
        title:
          "114514 hen",
      },
      {
        userId: 1,
        id: 2,
        title: "qui est esse",
      },
      {
        userId: 1,
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      },
    ],
    bus: [
      {
        "imei": "866005041185986",
        "lat": 0.0,
        "lng": 0.0,
        "speed": -9,
      },
      {
        "imei": "866005041186018",
        "lat": 22.610533,
        "lng": 113.997333,
        "speed": 0,
      }
    ],
    bus_remote: [],
    bus_remote2: [],
    timetable_jhl_rsb_workday: [],
    lut_up: [],
    lut_down: [],
    current_seconds: 0,
    sta_num_up: 124,
    sta_num_down: 1,
    stations: [{"no":1,"sta":"COE","up":0,"down":95,"name":"College of Engineering","name_cn":""},{"no":1,"sta":"RSB","up":9,"down":85,"name":"Research Building","name_cn":""},{"no":2,"sta":"GA7","up":15,"down":79,"name":"Gate 7","name_cn":""},{"no":3,"sta":"ADM","up":21,"down":71,"name":"Administration Building","name_cn":""},{"no":4,"sta":"GA1","up":31,"down":62,"name":"Gate 1","name_cn":""},{"no":5,"sta":"GA3","up":45,"down":48,"name":"Gate 3","name_cn":""},{"no":6,"sta":"FAP","up":53,"down":40,"name":"Guest Houses","name_cn":""},{"no":7,"sta":"FCT","up":57,"down":36,"name":"Faculty Cafeteria","name_cn":""},{"no":8,"sta":"CHC","up":60,"down":33,"name":"Community Health Service","name_cn":""},{"no":9,"sta":"SDT","up":66,"down":28,"name":"Student Dormitories","name_cn":""},{"no":10,"sta":"HYU1","up":83,"down":-1,"name":"Hui Yuan (U1)","name_cn":""},{"no":11,"sta":"LHH","up":98,"down":23,"name":"Lychee Hill","name_cn":""},{"no":12,"sta":"CYU","up":89,"down":19,"name":"Chuang Yuan","name_cn":""},{"no":13,"sta":"HYU2","up":111,"down":14,"name":"Hui Yuan (2)","name_cn":""},{"no":14,"sta":"JHL","up":124,"down":1,"name":"Joy Highland","name_cn":""}],
    display_data: [],
    map_display_data: [],
    countdown_timer: 10,
    bus_direction_data: [{"no": 0, "dest": "Joy Highland"},{"no": 1, "dest": "COE"}]


  }),
  async created() {


    const realtime_location_data = await axios.get(`https://bus.sustcra.com/api/v1/bus/timetable/`)
    const timetable_up = await axios.get(`https://bus.sustcra.com/sample/timetable-jhl-rsb-workday.json`)
    const timetable_down = await axios.get(`https://bus.sustcra.com/sample/timetable-rsb-jhl-workday.json`)
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
      this.get_scheduled_bus(1,this.timetable_up_workday)
      this.get_scheduled_bus(2,this.timetable_down_workday)


      //delete negative time, add directions

      let l;
      let temp1 = []
      for (l = 0; l < this.display_data.length; l++) {
        if (this.display_data[l].eta < 0){
          //console.log(l)
        } else {
          if (this.display_data[l].direction === 1) {
            this.display_data[l].direction_text = "JOY HIGHLAND";
          }
          if (this.display_data[l].direction === 2) {
            this.display_data[l].direction_text = "COE";
          }
          if (this.display_data[l].peak_line === 1){
            this.display_data[l].peak_text = "PEAK"
          }
          if (this.display_data[l].peak_line === 0){
            this.display_data[l].peak_text = "NORMAL"
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
    },
    get_scheduled_bus: function(direction, timetable){
      let k;
      for (k = 0; k < timetable.length; k++) {

        if ((timetable[k].time_sec - this.current_seconds < 1800) && (timetable[k].time_sec - this.current_seconds > 0)){
          //console.log("find a NYD bus" + timetable[k].time_sec)
          var scheduled_bus = {};
          scheduled_bus.depart_time = timetable[k].time_sec
          scheduled_bus.imei = "Not Departure Yet"
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
      this.$refs.map_container_leafletjs.add_marker(this.map_display_data);
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

    }
  }


};


</script>
