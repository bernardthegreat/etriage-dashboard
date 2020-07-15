<template>
  <header>
    <div class="navbar navbar-dark bg-primary shadow-sm">
      <div class="container d-flex justify-content-between">
        <a  href="#" v-on:click.prevent="changeRoute('/')" class="btn btn-outline-light" v-if="route != '/' ">
          <i class="fa fa-arrow-left"></i>
        </a>
        <a href="/admin" class="navbar-brand d-flex align-items-center">
          <strong>UERM ETriage Dashboard</strong>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
	props: ["route"],
  methods: {
    changeRoute(route) {
      this.route = route;
      window.location.pathname = this.route;
    }
  }
};
</script>

<style scoped>
</style>