import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    weather: {},
    forecast: {},
    api_key: process.env.VUE_API_KEY ? process.env.VUE_API_KEY : process.env.VUE_APP_API_KEY,
    url_base: "https://api.openweathermap.org/data/2.5/",
  },
  mutations: {
    setWeather (state, data) {
      state.weather = data;
    },
    setForecast (state, data) {
      state.forecast = data;
    }
  },
  actions: {
    fetchWeather({ dispatch, commit, state }, query) {
      fetch(`${state.url_base}weather?q=${query}&units=metric&APPID=${state.api_key}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit('setWeather', data)
          dispatch('fetchForecast', data.coord);
        });
    },
    fetchForecast({ commit, state }, {lat, lon}) {
      fetch(`${state.url_base}onecall?lat=${lat}&lon=${lon}&units=metric&appid=${state.api_key}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Forecast")
          console.log(data)
          commit('setForecast', data)
        });
    }
  }
})

export default store;