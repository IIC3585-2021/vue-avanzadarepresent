<template>
  <div id="app" :style="`--bkgImage: url(${backgroundImg});`">
    <main>
      <SearchBox />
      <Loading v-if="isLoading" />
      <div class="weather-wrap" v-if="weather.main && !isLoading">
        <LocationBox />
        <WeatherBox />
      </div>
      <div class="forecast-wrap" v-if="weather.main && !isLoading">
        <ForecastUnit :dayOfWeek="day + 1" v-for="day in Array(5).keys()" :key="day" />
      </div>
    </main>
  </div>
</template>

<script>
import SearchBox from "./components/SearchBox";
import LocationBox from "./components/LocationBox";
import WeatherBox from "./components/WeatherBox";
import ForecastUnit from "./components/ForecastUnit";
import Loading from "./components/Loading";
import { mapState } from "vuex";

export default {
  name: "app",
  components: { SearchBox, LocationBox, WeatherBox, Loading, ForecastUnit },
  data() {
    return {};
  },
  computed: {
    ...mapState(["weather", "isLoading"]),
    backgroundImg() {
      var backgroundStr = "cold-600.jpeg";
      if (this.weather.main) {
        const weatherId = this.weather.weather[0].id;
        console.log(weatherId);
        if (200 <= weatherId && weatherId <= 299) backgroundStr = "thunder-200.jpg";
        else if (300 <= weatherId && weatherId <= 399) backgroundStr = "drizzle-300.jpg";
        else if (400 <= weatherId && weatherId <= 599) backgroundStr = "rain-500.jpg";
        else if (600 <= weatherId && weatherId <= 699) backgroundStr = "cold-600.jpeg";
        else if (700 <= weatherId && weatherId <= 799) backgroundStr = "mist-700.jpg";
        else if (weatherId == 800) backgroundStr = "hot-800.jpeg";
        else if (801 <= weatherId && weatherId <= 899) backgroundStr = "clouds-800.jpg";
      }
      return require(`./assets/${backgroundStr}`);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "montserrat", sans-serif;
}

#app {
  background-image: var(--bkgImage);
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

.forecast-wrap {
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
}

main {
  min-height: 100vh;
  padding: 25px;

  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}
</style>
