<template>
  <div id="app">
    <LoginForm
      v-if="!userCredentials.isLoggedIn"
      v-bind:apiKey="apiKey"
      v-bind:apiUrl="apiUrl"
      v-bind:userCredentials="userCredentials"
    />
    <div v-if="userCredentials.isLoggedIn">
      <Header
        v-bind:route="route"
        v-bind:changeRoute="changeRoute"
        v-bind:baseUrl="baseUrl"
        v-bind:isViewInfirmary="userCredentials.isViewInfirmary"
      />
      <LogoutButton v-bind:userCredentials="userCredentials" />
      <div v-if="route == baseUrl">
        <Dashboard
          v-bind:changeRoute="changeRoute"
          v-bind:apiKey="apiKey"
          v-bind:apiUrl="apiUrl"
          v-bind:baseUrl="baseUrl"
        />
      </div>
      <div v-if="route == baseUrl + 'employees'">
        <Employee
          v-bind:changeRoute="changeRoute"
          v-bind:apiKey="apiKey"
          v-bind:apiUrl="apiUrl"
          v-bind:baseUrl="baseUrl"
        />
      </div>
      <div v-if="route == baseUrl + 'infirmary'">
        <Infirmary
          v-bind:changeRoute="changeRoute"
          v-bind:apiKey="apiKey"
          v-bind:apiUrl="apiUrl"
          v-bind:baseUrl="baseUrl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/core/Header.vue";
import Dashboard from "./components/Dashboard.vue";
import Employee from "./components/Employee.vue";
import Infirmary from "./components/Infirmary.vue";
import LoginForm from "./components/core/LoginForm.vue";
import LogoutButton from "./components/core/LogoutButton.vue";

export default {
  name: "App",
  data() {
    return {
      apiUrl: "https://apps.uerm.edu.ph:3443/",
      // apiUrl: "http://10.107.0.10:3000/",
      apiKey: "7190WHUt7gzKgrRURMnoS4D7tX6Xp112",
      userCredentials: {
        username: localStorage.code,
        isLoggedIn:
          localStorage.isLoggedIn == null ? false : localStorage.isLoggedIn,
        isViewInfirmary:
          localStorage.isViewInfirmary == null
            ? false
            : localStorage.isViewInfirmary,
      },
      route: "/etriage-dashboard/",
      baseUrl: "/etriage-dashboard/",
    };
  },
  components: {
    Header,
    Dashboard,
    Employee,
    Infirmary,
    LoginForm,
    LogoutButton,
  },
  mounted() {
    // this.login();
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
