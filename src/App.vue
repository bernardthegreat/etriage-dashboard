<template>
  <div id="app">
    <Header v-bind:route="route" v-bind:changeRoute="changeRoute" v-bind:baseUrl="baseUrl" />
    <div v-if="route == baseUrl">
      <Dashboard v-bind:changeRoute="changeRoute" v-bind:apiKey="apiKey" v-bind:apiUrl="apiUrl" v-bind:baseUrl="baseUrl" />
    </div>
    <div v-if="route == baseUrl + 'employees'">
      <Employee v-bind:changeRoute="changeRoute" v-bind:apiKey="apiKey" v-bind:apiUrl="apiUrl" v-bind:baseUrl="baseUrl" />
    </div>
    <div v-if="route == baseUrl + 'eTriageToday'">
      <EtriageToday v-bind:changeRoute="changeRoute" v-bind:apiKey="apiKey" v-bind:apiUrl="apiUrl" v-bind:baseUrl="baseUrl" />
    </div>
    <div v-if="route == baseUrl + 'eTriageByGenderToday'">
      <ByGenderToday v-bind:changeRoute="changeRoute" v-bind:apiKey="apiKey" v-bind:apiUrl="apiUrl" v-bind:baseUrl="baseUrl" />
    </div>
  </div>
</template>

<script>
import Header from "./components/core/Header.vue";
import Dashboard from "./components/Dashboard.vue";
import Employee from "./components/Employee.vue";
import EtriageToday from "./components/tables/TableEtriageToday.vue";
import ByGenderToday from "./components/tables/TableByGenderToday.vue";

export default {
  name: "App",
  data() {
    return {
      apiUrl: "https://apps.uerm.edu.ph:3443/",
      apiKey: "7190WHUt7gzKgrRURMnoS4D7tX6Xp112",
      route: '/etriage-dashboard/',
      baseUrl: '/etriage-dashboard/',
    };
  },
  components: {
    Header,
    Dashboard,
    Employee,
    EtriageToday,
    ByGenderToday,
  },
  methods: {
    changeRoute(route) {
      this.route = this.baseUrl + route;
      // window.location.pathname = this.route;
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>
