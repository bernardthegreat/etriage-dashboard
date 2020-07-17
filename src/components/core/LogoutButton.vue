<template>
  <div class="p-3 text-right">
    <button class="btn btn-warning btn-sm" v-on:click="logout">
      <b class="fa fa-sign-out"></b>
      Logout
    </button>
  </div>
</template>

<script>
export default {
  props:["userCredentials"],
  methods:{
    logout(){
      localStorage.clear()
      this.userCredentials.isViewInfirmary = false;
      this.userCredentials.username = null;
      this.userCredentials.isLoggedIn = false;
    }
  }
}
</script>

<style scoped>

</style>