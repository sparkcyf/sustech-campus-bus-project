<template>
  <div id='map' ref="map-root" ></div>
</template>
<div id="mapContainer"></div>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";


import "leaflet-rotatedmarker";
export default {
name: "MapContainer_leafletjs",
  data: () => ({
    route_geojson: {"type":"FeatureCollection", "features":[
        {"type":"Feature","geometry":{"type":"LineString","coordinates":[[113.990824,22.60341],[113.990211,22.603329],[113.990279,22.602897],[113.990423,22.60261],[113.991465,22.601627],[113.991918,22.601133],[113.992029,22.600582],[113.991867,22.600065],[113.99153,22.599646],[113.991205,22.599398],[113.990871,22.599227],[113.990439,22.598856],[113.990359,22.598318],[113.990303,22.597852],[113.990271,22.597418],[113.990426,22.597066],[113.990852,22.59701],[113.991218,22.597104],[113.991478,22.597162],[113.991689,22.597227],[113.991982,22.597222],[113.992305,22.597075],[113.992584,22.596835],[113.992856,22.596597],[113.993219,22.596285],[113.993527,22.596119],[113.993828,22.596039],[113.99408,22.596021],[113.99427,22.596027],[113.9945,22.595649],[113.994652,22.595565],[113.994908,22.595696],[113.995443,22.595967],[113.995863,22.596475],[113.996155,22.59684],[113.996509,22.597232],[113.996763,22.597532],[113.997075,22.597922],[113.997398,22.598282],[113.997624,22.598516],[113.997842,22.59877],[113.998103,22.599046],[113.998466,22.599319],[113.998785,22.599535],[113.999029,22.599683],[113.999383,22.599891],[113.999652,22.60001],[113.999411,22.600237],[113.999105,22.600493],[113.998938,22.600684],[113.998796,22.600938],[113.998777,22.601202],[113.998647,22.601603],[113.998315,22.60199],[113.998129,22.602425],[113.998018,22.602778],[113.998036,22.603052],[113.99781,22.603325],[113.997148,22.603094],[113.996549,22.602942],[113.99593,22.60293],[113.995509,22.602953],[113.995209,22.603217],[113.994907,22.603566],[113.994463,22.604021],[113.994043,22.604424],[113.993743,22.604991],[113.993458,22.605447],[113.994103,22.605786],[113.99478,22.606166],[113.995163,22.606302],[113.995236,22.606525],[113.99528,22.606706],[113.995777,22.606618],[113.99646,22.606387],[113.997059,22.606152],[113.9975,22.605978],[113.997728,22.605905],[113.998114,22.606013],[113.998295,22.606013],[113.998529,22.606292],[113.998684,22.606722],[113.998773,22.607275],[113.99882,22.60762],[113.998844,22.607846],[113.998891,22.608161],[113.998653,22.608555],[113.9985,22.608911],[113.998351,22.609296],[113.998243,22.609588],[113.998077,22.60986],[113.997875,22.610146],[113.997702,22.610488],[113.997464,22.610681]]},"properties":{"name":"ctrl-point-downhill","tessellate":"true"}}
      ]},
    stations_geojson: {"type":"FeatureCollection", "features":[
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.990832,22.603402]},"properties":{"name":"工学院 COE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.99153,22.599643]},"properties":{"name":"科研楼 Research Building"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.990399,22.597132]},"properties":{"name":"七号门 Gate7"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.992403,22.597011]},"properties":{"name":"行政楼 Administration Building"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.994898,22.59569]},"properties":{"name":"1号门 Gate1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.99939,22.599893]},"properties":{"name":"3号门 Gate3"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.998329,22.601975]},"properties":{"name":"专家公寓 Guest Houses"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.997811,22.603325]},"properties":{"name":"教工餐厅 Faculty Cafteria"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.995981,22.60293]},"properties":{"name":"社康中心 C.Health.Center"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.994041,22.604431]},"properties":{"name":"学生宿舍 Student Dormitory"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.995238,22.606518]},"properties":{"name":"荔园 Lychee Hill"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.996732,22.606278]},"properties":{"name":"创园 Chuang Yuan"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.998372,22.606102]},"properties":{"name":"慧园 Hui Yuan"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[113.997473,22.610667]},"properties":{"name":"欣园 Joy Highland"}}
      ]}
  }),
  mounted() {

    this.init_marker();
    //var markers = new L.FeatureGroup();
    this.map = L.map('map').setView([22.602265, 113.994955], 15);

    //


      //Wkikmedia maps tile
      //https://maps.cra.moe/{z}/{x}/{y}.png
      //https://windytiles.mapy.cz/turist-en/{z}-{x}-{y}.png
      //https://maps.cra.moe/{z}/{x}/{y}.png
      //https://maps2.cra.moe/maps/streets/{z}/{x}/{y}.png?key=iN1z1bnMdds2aQkYFIpe


      L.tileLayer('https://maps2.cra.moe/maps/streets/{z}/{x}/{y}@2x.png?key=iN1z1bnMdds2aQkYFIpe', {
        //           maxZoom: 20,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Bus data: SUSTech CS Office</a>',
        tileSize: 512,
        zoomOffset: -1,
        crossOrigin: true
//            id: 'mapbox/light-v9',
//            tileSize: 512,
//            zoomOffset: -1
      }).addTo(this.map);

    // var gl = L.mapboxGL({
    //     style: 'https://api.maptiler.com/maps/streets/style.json?key=iN1z1bnMdds2aQkYFIpe'
    // }).addTo(this.map);

    //route geojson
    L.geoJSON(this.route_geojson).addTo(this.map);

    //station geojson
    function onEachFeature(feature, layer) {
       var popupContent = "";

      if (feature.properties && feature.properties.name) {
        popupContent += feature.properties.name;
      }

      layer.bindPopup(popupContent);
    }

    L.geoJSON([this.stations_geojson], {

      style: function (feature) {
        return feature.properties && feature.properties.style;
      },

      onEachFeature: onEachFeature,

      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 5,
          fillColor: "#ffffff",
          color: "#002249",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      }
    }).addTo(this.map);





    this.add_marker(this.$parent.map_display_data);


    },
    methods: {
      async init_marker(){
        this.markers = await new L.FeatureGroup();
        console.log("init marker done.")
      },
      add_marker: function (bus_data){
        //clean old markers
        this.markers.clearLayers()
        // eslint-disable-next-line no-unused-vars
        var bus_icon = L.icon({
          iconUrl: 'https://cdn.jsdelivr.net/gh/sparkcyf/sustech-campus-bus-project@master/realtime-location-fronted-1/bus-top-view.svg',
          //     shadowUrl: 'leaf-shadow.png',

          iconSize: [48, 36], // size of the icon
          //       shadowSize:   [50, 64], // size of the shadow
          iconAnchor: [24, 18], // point of the icon which will correspond to marker's location
          //       shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor: [-3, -30] // point from which the popup should open relative to the iconAnchor
        });

        //add marker loop
        let i;
        // console.log("-----------")
        // console.log(this.$parent.map_display_data)
        // console.log("-----------")
        var date = new Date(0);
        for (i = 0; i < bus_data.length; i++) {
          if (bus_data[i].tag === 1) {
            // eslint-disable-next-line no-unused-vars
            let peak_text;
            // console.log(bus_data[i])
            // console.log(this.bus_data[i].peak_line)
            if (bus_data[i].peak_line === 1){
              peak_text = "PEAK"
            }
            if (bus_data[i].peak_line === 0){
              peak_text = "NORMAL"
            }
            //
            // eslint-disable-next-line no-unused-vars
            let direction_text;
            if (bus_data[i].direction === 1) {
              direction_text = "JOY HIGHLAND";
            }
            if (bus_data[i].direction === 2) {
              direction_text = "COE";
            }
            date.setSeconds(bus_data[i].depart_time);
            var depart_time_text = date.toISOString().substr(11, 8)


            //init marker
            var marker = L.marker([bus_data[i].lat, bus_data[i].lng], {
              icon: bus_icon,
              rotationAngle: (bus_data[i].course)
            })
            marker.bindPopup('The IMEI is ' + bus_data[i].imei + '<br>' +
                'ctrl_point is ' + bus_data[i].ctrl_point + '<br>' +
                'The Departure time of the bus is ' + depart_time_text + '.<br>' +
                'The type of line is ' + peak_text + '.<br>' +
                'Its ETA is <b>' + Math.round(bus_data[i].eta) + '</b> seconds.' + '<br>Direction: ' + direction_text);
            this.markers.addLayer(marker)
            this.map.addLayer(this.markers);
          }

        }








      }
    }
}
</script>

<style scoped>

</style>