<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'temp' : ''">
    <main>
      <SearchBox />
      <Loading v-if="isLoading" />
      <div class="weather-wrap" v-if="weather.main && !isLoading">
        <LocationBox />
        <WeatherBox />
      </div>
    </main>
  </div>
</template>

<script>
import SearchBox from "./components/SearchBox";
import LocationBox from "./components/LocationBox";
import WeatherBox from "./components/WeatherBox";
import Loading from "./components/Loading";
import { mapState } from "vuex";

export default {
  name: "app",
  components: { SearchBox, LocationBox, WeatherBox, Loading },
  data() {
    return {};
  },
  computed: mapState(["weather", "isLoading"]),
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
  background-image: url("./assets/cold-emoji.jpeg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

#app.temp {
  background-image: url("./assets/hot-emoji.jpeg");
}

main {
  min-height: 100vh;
  padding: 25px;

  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}
</style>
