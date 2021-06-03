<template>
  <div class="search-box">
    <input type="text" class="search-bar" placeholder="Buscar..." v-model="query" @keyup.enter="fetchWeather(query)" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SearchBox",
  data() {
    return {
      query: "",
    };
  },
  methods: {
    ...mapActions(["fetchWeather"]),
  },
};
</script>

<style>
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
</style>
