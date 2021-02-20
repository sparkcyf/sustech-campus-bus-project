<template>
  <div>
    <div ref="map-root" id="map-root" style="width: 100%; height: 400px;"></div>
    <div></div>
  </div>
</template>

<script>
import 'ol/ol.css';
// import GeoJSON from 'ol/format/GeoJSON';
//import Overlay from 'ol/Overlay';
import Layer from 'ol/layer/Layer';
import Map from 'ol/Map';
import Source from 'ol/source/Source';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
// import {Stroke, Style} from 'ol/style';
import {fromLonLat, toLonLat} from 'ol/proj';
import mapboxgl from 'mapbox-gl';
// import LonLat from "ol/geom/Geometry";
//import Projection from "ol/proj/Projection";
// import Marker from "mapbox-gl/src/ui/marker";
import 'ol/ol.css';
import Feature from 'ol/Feature';
//import Map from 'ol/Map';
//import Overlay from 'ol/Overlay';
import Point from 'ol/geom/Point';
//import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
//import View from 'ol/View';
import {Icon, Style} from 'ol/style';
import VectorLayer from "ol/layer/Vector";
//import axios from "axios";
//import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
// import VectorLayer from 'ol/layer/Vector'
// import VectorSource from 'ol/source/Vector'
// import GeoJSON from 'ol/format/GeoJSON'

// import {toStringHDMS} from 'ol/coordinate';


// this is a simple triangle over the atlantic ocean


export default {

  name: 'MapContainer',
  components: {},
  props: {},
  mounted() {


    var center = [113.994955, 22.602265];
    //var key = 'Ic281kQUra6b0fefwkjZ';

    mapboxgl.accessToken = 'pk.eyJ1Ijoic3Bhcmt0b3VyIiwiYSI6ImNrZHZwbzJnaDBvNTgycW5vZXpueTdkbjIifQ.53uysEs1qvK8JXHG-AG7uw';
    var mbMap = new mapboxgl.Map({
      style: 'mapbox://styles/sparktour/ckld42lo229om17ql4md26mkq',
      attributionControl: false,
      boxZoom: false,
      center: center,
      container: this.$refs['map-root'],
      doubleClickZoom: false,
      dragPan: false,
      dragRotate: false,
      interactive: false,
      keyboard: false,
      pitchWithRotate: false,
      scrollZoom: false,
      touchZoomRotate: false,
    });

    var mbLayer = new Layer({
      render: function (frameState) {
        var canvas = mbMap.getCanvas();
        var viewState = frameState.viewState;

        var visible = mbLayer.getVisible();
        canvas.style.display = visible ? 'block' : 'none';

        canvas.style.opacity = mbLayer.getOpacity();

        // adjust view parameters in mapbox
        var rotation = viewState.rotation;
        mbMap.jumpTo({
          center: toLonLat(viewState.center),
          zoom: viewState.zoom - 1,
          bearing: (-rotation * 180) / Math.PI,
          animate: false,
        });

        // cancel the scheduled update & trigger synchronous redraw
        // see https://github.com/mapbox/mapbox-gl-js/issues/7893#issue-408992184
        // NOTE: THIS MIGHT BREAK IF UPDATING THE MAPBOX VERSION
        if (mbMap._frame) {
          mbMap._frame.cancel();
          mbMap._frame = null;
        }
        mbMap._render();

        return canvas;
      },
      source: new Source({
        attributions: [
          '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a>',
          '<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'],
      }),
    });



    //init layers
    //this.create_vector_layer;

    this.map = new Map({
      target: this.$refs['map-root'],
      view: new View({
        center: fromLonLat(center),
        zoom: 15,
      }),
      layers: [mbLayer],
    });
    this.create_vector_layer();

    this.add_bus_to_map(this.$parent.map_display_data);




    //add icon(bus)

    //this.add_bus_to_map(this.$parent.map_display_data)
    //

    // console.log(this.map.getLayers())


    //   var source = vectorLayer.getSource();
    //   source.clear()
    //   source.addFeatures(feature2);


  },
  methods: {
    create_vector_layer: function () {
      this.vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [], // the vector layer is now created empty
        }),
      })
      this.map.getLayers().insertAt(0, this.vectorLayer);

      console.log("init vector layer done")
    },
    add_bus_to_map: function (bus_data) {

      var iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        }),
      });
      var bus_set = [];
      // var source = this.vectorLayer.getSource();
      // source.clear();

      let i;
      for (i = 0; i < bus_data.length; i++) {
        if (bus_data[i].tag === 1) {
          var iconFeature = new Feature({
            geometry: new Point(fromLonLat([bus_data[i].lng, bus_data[i].lat])),
            name: bus_data[i].imei.toString(),
            direction: bus_data[i].direction,
            eta: bus_data[i].eta,
          });
          iconFeature.setStyle(iconStyle);
          bus_set.push(iconFeature);

        }

      }







      //console.log(source)

      //this.vectorLayer.getSource().clear()
      //console.log(source)
      var vectorSource = new VectorSource({
        features: bus_set,
      });
      this.vectorLayer = new VectorLayer({
        source: vectorSource,
      });
      //console.log(this.vectorLayer.getSource().features)
      //source.addFeatures(vectorSource);

      //force delete layer
      this.map.getLayers().getArray()
          .filter(layer => layer.get('name') === 'VectorLayer')
          .forEach(layer => this.map.removeLayer(layer));

      //update layer


      //this.vectorLayer.getSource().addFeatures(vectorSource);
      //this.vectorLayer.changed()
      this.map.getLayers().insertAt(0, this.vectorLayer);
      console.log(this.vectorLayer.getSource())
      console.log(this.map.getLayers())
      console.log("Add/Update bus done.")
    }
  }
}
</script>