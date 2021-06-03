<template>
  <div class="weather-box">
    <div class="temperature">{{ Math.round(weather.main.temp * 10) / 10 }}°C</div>
    <div class="weather">{{ capitalizeFirstLetter(weather.weather[0].description) }}</div>
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
  computed: mapState(["weather"]),
};
</script>

<style>
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
