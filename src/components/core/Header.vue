<template>
  <header>
    <div class="navbar navbar-dark bg-primary shadow-sm">
      <div class="container d-flex justify-content-between">
        <div v-if="route != '/etriage-dashboard/employees'">
          <a href="#" v-on:click.prevent="changeRoute('employees')" class="btn btn-outline-light">
            <i class="fa fa-arrow-left"></i>
          </a>
        </div>
        <div v-if="route != baseUrl">
          <a  href="#" v-on:click.prevent="changeRoute('')" class="btn btn-outline-light" v-if="route == '/etriage-dashboard/employees'">
            <i class="fa fa-arrow-left"></i>
          </a>
        </div>
        <a href="#" class="navbar-brand d-flex align-items-center">
          <strong>UERM ETriage Dashboard</strong>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
	props: ["route","changeRoute", "baseUrl"],
  methods: {
    
  }
};
</script>

<style scoped>
</style>