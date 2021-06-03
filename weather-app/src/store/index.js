import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    weather: {},
    api_key: process.env.VUE_API_KEY ? process.env.VUE_API_KEY : process.env.VUE_APP_API_KEY,
    url_base: "https://api.openweathermap.org/data/2.5/",
  },
  mutations: {
    setWeather (state, data) {
      state.weather = data
    }
  },
  actions: {
    fetchWeather({ commit, state }, query) {
      fetch(`${state.url_base}weather?q=${query}&units=metric&APPID=${state.api_key}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit('setWeather', data)
        });
    },
  }
})

export default store;