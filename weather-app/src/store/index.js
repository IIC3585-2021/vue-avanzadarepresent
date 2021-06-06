import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    weather: {},
    forecast: {},
    isLoading: false,
    api_key: process.env.VUE_API_KEY ? process.env.VUE_API_KEY : process.env.VUE_APP_API_KEY,
    url_base: "https://api.openweathermap.org/data/2.5/",
  },
  mutations: {
    changeLoading (state, value) {
      state.isLoading = value;
    },
    setWeather (state, data) {
      state.weather = data;
    },
    setForecast (state, data) {
      state.forecast = data;
    }
  },
  actions: {
    fetchWeather({ dispatch, commit, state }, query) {
      commit('changeLoading', true);
      fetch(`${state.url_base}weather?q=${query}&units=metric&lang=es&APPID=${state.api_key}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit('setWeather', data)
          dispatch('fetchForecast', data.coord);
        });
    },
    fetchForecast({ commit, state }, {lat, lon}) {
      fetch(`${state.url_base}onecall?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${state.api_key}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Forecast")
          console.log(data)
          commit('setForecast', data)
          commit('changeLoading', false);
        });
    }
  }
})

export default store;