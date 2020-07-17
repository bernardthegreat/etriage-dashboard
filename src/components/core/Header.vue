<template>
  <header>
    <div class="navbar navbar-dark bg-primary shadow-sm">
      <div class="container d-flex justify-content-between">
        <div v-if="route != baseUrl">
          <a href="#" v-on:click.prevent="changeRoute('')" class="btn btn-outline-light">
            <i class="fa fa-home"></i>
          </a>
        </div>
        <a href="#" class="navbar-brand d-flex align-items-center">
          <strong>UERM ETriage Dashboard</strong>
        </a>
        <div class="d-none" v-if="route != baseUrl && route != '/etriage-dashboard/infirmary'">
          <a href="#" v-on:click.prevent="changeRoute('infirmary')" class="btn btn-outline-light">
            <i class="fa fa-sign-in"></i>
          </a>
        </div>
      </div>
      <div></div>
    </div>
  </header>
</template>

<script>
export default {
  props: ["route", "changeRoute", "baseUrl"],
  methods: {}
};
</script>