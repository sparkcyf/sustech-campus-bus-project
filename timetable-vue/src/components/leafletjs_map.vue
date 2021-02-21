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
    route_geojson: {
      "type": "FeatureCollection", "features": [
        {
          "type": "Feature", "geometry": {
            "type": "LineString",
            "coordinates": [[113.991474905071, 22.5995578639097, 0], [113.99120548565, 22.5993984442423, 0], [113.990871111373, 22.5992273583025, 0], [113.990438868542, 22.5988556202153, 0], [113.99035854976, 22.5983184780662, 0], [113.990303493128, 22.597852353438, 0], [113.990271122991, 22.5974175475434, 0], [113.990425827457, 22.5970663177642, 0], [113.99085177206, 22.5970103428823, 0], [113.991218154094, 22.5971035764697, 0], [113.991477615589, 22.5971624791277, 0], [113.991689350913, 22.5972274068443, 0], [113.99198242738, 22.5972218479079, 0], [113.992305377769, 22.5970751001672, 0], [113.992583721421, 22.5968347284597, 0], [113.992856148846, 22.5965966333275, 0], [113.993219208091, 22.5962852164537, 0], [113.993526964364, 22.5961191075337, 0], [113.993827831042, 22.596039301559, 0], [113.99408046156, 22.5960208695522, 0], [113.994269739751, 22.5960271393208, 0], [113.994499679455, 22.5956490984755, 0], [113.994652289657, 22.5955650670575, 0], [113.994908103167, 22.5956958820479, 0], [113.995442863651, 22.5959672524098, 0], [113.995862524707, 22.5964753625872, 0], [113.996155331924, 22.5968400089816, 0], [113.996508905698, 22.5972321193261, 0], [113.996762810774, 22.5975319248626, 0], [113.99707520964, 22.5979217220742, 0], [113.99739827277, 22.5982820655105, 0], [113.997623626077, 22.5985155079414, 0], [113.997842067804, 22.598770149162, 0], [113.998102848729, 22.5990457211399, 0], [113.998465703124, 22.5993188035995, 0], [113.998784737022, 22.599535440221, 0], [113.999029309757, 22.5996833022418, 0], [113.999383415556, 22.5998914944798, 0], [113.999652017481, 22.6000098063961, 0], [113.999410925116, 22.6002373320928, 0], [113.999104809902, 22.600493221791, 0], [113.998937777688, 22.6006840644765, 0], [113.998796001197, 22.6009384291598, 0], [113.998776854973, 22.6012017929467, 0], [113.99864650783, 22.6016030523502, 0], [113.998315106153, 22.6019902058158, 0], [113.998129350408, 22.6024249619495, 0], [113.998018208685, 22.60277812686, 0], [113.998035535549, 22.6030522036165, 0], [113.997810190998, 22.6033251501689, 0], [113.997148302384, 22.603093735691, 0], [113.996548834678, 22.6029424155087, 0], [113.995929987698, 22.6029298378861, 0], [113.995509076352, 22.602953071226, 0], [113.995208733913, 22.6032174588879, 0], [113.994906676935, 22.603565797586, 0], [113.994463205616, 22.6040214237258, 0], [113.99404307991, 22.6044242709475, 0], [113.993742699677, 22.6049908103233, 0], [113.99345753339, 22.6054471667278, 0], [113.99410264537, 22.605785572167, 0], [113.994779724329, 22.6061659083821, 0], [113.995162622914, 22.6063015426974, 0], [113.995236382676, 22.6065245505898, 0], [113.995280185276, 22.6067064372239, 0], [113.995776639282, 22.6066182615105, 0], [113.996460302673, 22.6063866567717, 0], [113.997058597569, 22.6061520656827, 0], [113.997499869837, 22.6059784179845, 0], [113.997728308405, 22.6059051029878, 0], [113.998113538609, 22.6060129324337, 0], [113.998294754175, 22.6060126290703, 0], [113.998528950335, 22.6062919245772, 0], [113.99868406298, 22.6067224224212, 0], [113.998773343783, 22.6072747716093, 0], [113.998820377309, 22.6076196914398, 0], [113.998843576084, 22.6078455764574, 0], [113.998891483055, 22.6081606961109, 0], [113.99865284819, 22.6085549994136, 0], [113.998499955313, 22.6089111685076, 0], [113.998350628838, 22.6092960893901, 0], [113.998242850779, 22.6095883166435, 0], [113.998077085842, 22.6098602980525, 0], [113.997875477003, 22.610146491032, 0], [113.997701529791, 22.6104875954142, 0], [113.997463728329, 22.610680644227, 0]]
          }, "properties": {"name": "ctrl-point-downhill", "tessellate": true}
        }
      ]
    }
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

    L.geoJSON(this.route_geojson).addTo(this.map)
    this.add_marker(this.$parent.map_display_data);


    },
    methods: {
      async init_marker(){
        this.markers = await new L.FeatureGroup();
        console.log("init marker don")
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