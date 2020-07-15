<template>
  <div id="app">
    <Header v-bind:route="route" />
    <div v-if="route == '/'">
      <Dashboard v-bind:apiKey="apiKey" v-bind:apiUrl="apiUrl" />
    </div>
    <div v-if="route == '/employees'">
      <Employee v-bind:apiKey="apiKey" v-bind:apiUrl="apiUrl" />
    </div>
    <div v-if="route == '/eTriageToday'">
      <EtriageToday v-bind:apiKey="apiKey" v-bind:apiUrl="apiUrl" />
    </div>
    <div v-if="route == '/eTriageByGenderToday'">
      <ByGenderToday v-bind:apiKey="apiKey" v-bind:apiUrl="apiUrl" />
    </div>
  </div>
</template>

<script>
import Header from './components/core/Header.vue'
import Dashboard from './components/Dashboard.vue'
import Employee from './components/Employee.vue'
import EtriageToday from './components/tables/TableEtriageToday.vue'
import ByGenderToday from './components/tables/TableByGenderToday.vue'

export default {
  name: 'App',
  data() {
    return {
      apiUrl: "https://apps.uerm.edu.ph:3443/",
      apiKey: "7190WHUt7gzKgrRURMnoS4D7tX6Xp112",
      route:window.location.pathname,
    }
  },
  components: {
    Header,
    Dashboard,
    Employee,
    EtriageToday,
    ByGenderToday,
  },
}

</script>

<style>

@import'~bootstrap/dist/css/bootstrap.css';
</style>
