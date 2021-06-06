<template>
  <div class="map" id="map-box"></div>
</template>

<script>
import L from "leaflet";
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
      console.log(`RENDER THE MAP at ${this.map_opts.lat} KRONK`);

      this.map = L.map("map-box", {
        center: [this.map_opts.lat, this.map_opts.lon],
        zoom: this.map_opts.zoom,
      });

      this.tileLayer = L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      );

      this.weatherLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/temp_new/${this.map_opts.zoom}/33/50.png?appid=${this.api_key}`
      );

      this.tileLayer.addTo(this.map);
      this.weatherLayer.addTo(this.map);
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
}
</style>