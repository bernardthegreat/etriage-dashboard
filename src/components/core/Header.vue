<template>
  <header>
    <div class="navbar navbar-dark bg-primary shadow-sm">
      <div class="container d-flex justify-content-between">
        <a  href="#" v-on:click.prevent="changeRoute('')" class="btn btn-outline-light" v-if="route != baseUrl ">
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
	props: ["route","changeRoute", "baseUrl"],
  methods: {
    
  }
};
</script>

<style scoped>
</style>