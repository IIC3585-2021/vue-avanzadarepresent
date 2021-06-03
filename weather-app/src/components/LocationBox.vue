<template>
  <div class="location-box">
    <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
    <div class="date">{{ new Date() }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LocationBox",
  computed: mapState(["weather"]),
};
</script>

<style>
.location-box .location {
  color: #fff;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  margin: 15px 0px;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  font-style: italic;
}
</style>
