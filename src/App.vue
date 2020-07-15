<template>
  <div id="app">
    <Header v-bind:route="route" />
    <div v-if="route == '/etriage-dashboard/'">
      <Dashboard v-bind:changeRoute="changeRoute" v-bind:apiKey="apiKey" v-bind:apiUrl="apiUrl" />
    </div>
    <div v-if="route == '/etriage-dashboard/employees'">
      <Employee v-bind:changeRoute="changeRoute" v-bind:apiKey="apiKey" v-bind:apiUrl="apiUrl" />
    </div>
    <div v-if="route == '/etriage-dashboard/eTriageToday'">
      <EtriageToday v-bind:changeRoute="changeRoute" v-bind:apiKey="apiKey" v-bind:apiUrl="apiUrl" />
    </div>
    <div v-if="route == '/etriage-dashboard/eTriageByGenderToday'">
      <ByGenderToday v-bind:changeRoute="changeRoute" v-bind:apiKey="apiKey" v-bind:apiUrl="apiUrl" />
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
      route: window.location.pathname,
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
      this.route = route;
      window.location.pathname = this.route;
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>
