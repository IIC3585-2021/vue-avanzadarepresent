<template>
  <div id='app' :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'temp' : ''">
    <main>
      <div class="search-box">
        <input
        type="text"
        class="search-bar"
        placeholder="Buscar..."
        v-model="query"
        @keyup.enter="fetchWeather"
        />
      </div>

      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'" >
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }} </div>
          <div class="date">{{ new Date() }}</div>
        </div>
        <div class="weather-box">
          <div class="temperature">{{ Math.round(weather.main.temp * 10) / 10 }}°C</div>
          <div class="weather">{{ capitalizeFirstLetter(weather.weather[0].description) }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>


export default {
  name: 'app',
  data () {
    return {
      api_key: process.env.VUE_API_KEY,
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {}
    }
  },
  methods: {
    fetchWeather () {
      fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
        .then(response => {
          return response.json()
        })
        .then(this.setData)
    },
    setData (data) {
      this.weather = data;
    },
    capitalizeFirstLetter(string) {
      return string.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'montserrat', sans-serif;
}

#app {
  background-image: url('./assets/cold-emoji.jpeg');
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

#app.temp {
  background-image: url('./assets/hot-emoji.jpeg');
}

main {
  min-height: 100vh;
  padding: 25px;

  background-image: linear-gradient(to bottom, rgba(0,0,0, 0.25), rgba(0,0,0, 0.75));
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 15px 15px 15px 15px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.75);
}

.location-box .location {
  color: #FFF;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  margin: 15px 0px;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #FFF;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  font-style: italic;
}

.weather-box {
  text-align: center;
}

.weather-box .temperature {
  display: inline-block;
  padding: 25px 25px;
  color: #FFF;
  font-size: 100px;
  font-weight: 900;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);

  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 15px;

  margin: 30px 0px;

  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);;
}

.weather-box .weather {
  color: white;
  font-size: 50px;
  font-weight: 500;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);

}
</style>


