<template>
  <div class="map" id="map-box"></div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { mapState } from "vuex";

export default {
  name: "MapBox",
  data() {
    return {
      map: null,
      tileLayer: null,
      layers: [],
      lat: 0,
      lon: 0,
    };
  },
  computed: mapState(["map_opts", "api_key"]),
  methods: {
    renderMap() {
      this.map = new Map({
        target: "map-box",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([this.map_opts.lon, this.map_opts.lat]),
          zoom: this.map_opts.zoom,
        }),
      });

      var tempLayer = new TileLayer({
        source: new XYZ({
          url: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${this.api_key}`,
        }),
      });

      var precipitationLayer = new TileLayer({
        source: new XYZ({
          url: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${this.api_key}`,
        }),
      });
      this.map.addLayer(precipitationLayer);
      this.map.addLayer(tempLayer);
    },
  },
  mounted() {
    this.lat = Math.round(this.map_opts.lat);
    this.lon = Math.round(this.map_opts.lon);
    this.renderMap();
  },
};
</script>

<style>
.map {
  height: 600px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
}
</style>