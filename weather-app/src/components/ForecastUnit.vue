<template>
  <div class="forecast-box">
    <div class="temperature">
      <div>{{ this.daysOfWeek[this.forecastDay] }}</div>
      <div class="forecast-icon">
        <img :src="icon" />
      </div>
      <div>{{ actualTemp }}°C</div>
      <div class="forecast">{{ tempDetail }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ForecastBox",
  props: ["dayOfWeek"],
  methods: {
    capitalizeFirstLetter(string) {
      return string
        .trim()
        .toLowerCase()
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    },
  },
  computed: {
    ...mapState(["weather", "forecast", "daysOfWeek", "todayIndex"]),
    forecastDay() {
      return (this.todayIndex + this.dayOfWeek) % 7;
    },
    tempDetail() {
      console.log();
      return this.capitalizeFirstLetter(this.forecast.daily[this.dayOfWeek].weather[0].description);
    },
    actualTemp() {
      console.log(this.forecast.daily[this.dayOfWeek].temp.day);
      return Math.round(this.forecast.daily[this.dayOfWeek].temp.day);
    },
    icon() {
      var iconId = this.forecast.daily[this.dayOfWeek].weather[0].icon;
      return require(`../assets/icons/${iconId}.png`);
    },
  },
};
</script>

<style>
.forecast-icon {
  margin-bottom: 0;
}

.forecast-box {
  text-align: center;
}

.forecast-box .temperature {
  display: inline-block;
  height: 10em;
  width: 7em;
  padding: 25px 25px;
  color: #fff;
  font-size: 35px;
  font-weight: 600;

  text-shadow: 1px 2px rgba(0, 0, 0, 0.25);

  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 15px;

  margin: 30px 0px;

  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.forecast-box .forecast {
  color: white;
  font-size: 30px;
  font-weight: 500;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
