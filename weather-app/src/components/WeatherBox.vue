<template>
  <div class="weather-box">
    <div class="temperature">
      <div class="weather-icon">
        <img :src="icon" />
      </div>
      <div>{{ actualTemp }}°C</div>
      <div class="weather">{{ tempDetail }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "WeatherBox",
  methods: {
    capitalizeFirstLetter(string) {
      return string
        .trim()
        .toLowerCase()
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    },
  },
  computed: {
    ...mapState(["weather"]),
    tempDetail() {
      return this.capitalizeFirstLetter(this.weather.weather[0].description);
    },
    actualTemp() {
      return Math.round(this.weather.main.temp);
    },
    icon() {
      var iconId = this.weather.weather[0].icon;
      return require(`../assets/icons/${iconId}.png`);
    },
  },
};
</script>

<style>
.weather-icon {
  margin-bottom: 0;
}

.weather-box {
  text-align: center;
}

.weather-box .temperature {
  display: inline-block;
  padding: 25px 25px;
  color: #fff;
  font-size: 100px;
  font-weight: 900;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);

  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 15px;

  margin: 30px 0px;

  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: white;
  font-size: 50px;
  font-weight: 500;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
