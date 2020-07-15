<template>
  <div id="app">
    <Dashboard></Dashboard>
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue'

export default {
  name: 'App',
  data() {
    return {
      apiUrl: "https://apps.uerm.edu.ph:3443/",
      apiKey: "7190WHUt7gzKgrRURMnoS4D7tX6Xp112",
    }
  },
  components: {
    Dashboard
  }
}
</script>

<style>

@import'~bootstrap/dist/css/bootstrap.css';
</style>
