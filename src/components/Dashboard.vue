<template>
  <main role="main">
    <div v-if="!isDataLoaded" class="py-5 text-center">
      <div>
        <b class="fa fa-spinner fa-spin fa-5x"></b>
      </div>
      <div>
        <p>
          FETCHING DATA ...
        </p>
      </div>
    </div>
    <div class="container py-5" v-if="isDataLoaded">
      <div class="row">
        <div class="col-sm-6" v-bind:key="key" v-for="(app, key) in apps">
          <div
            class="position-relative rounded"
            v-bind:class="[app.background]"
            style="padding-top: 100%;"
          >
            <a
              href="#"
              v-on:click.prevent="changeRoute(app.route)"
              class="position-absolute d-flex align-items-center justify-content-center flex-column"
              style="top: 0; bottom: 0; left: 0; right: 0;color:#FFF;text-decoration: none;"
            >
              <h1 class="display-2"><b v-bind:class="app.icon"></b></h1>
              <h2 class="text-center">{{ app.name }}</h2>
              <h3>Today: {{ app.count }}</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: ["apiKey", "apiUrl","changeRoute"],
  data() {
    return {
      eTriageVisitorsCountToday: "",
      eTriageEmployeesCountToday: "",
      apps: [
        {
          name: "Employees / Residents / Consultants",
          route: "employees",
          icon: "fa fa-user",
          background: "bg-primary",
          count: "",
        },
        {
          name: "Visitors",
          route: "visitors",
          icon: "fa fa-users",
          background: "bg-danger",
          count: "",
        },
      ],
      isDataLoaded: false,
    };
  },

  created() {
    this.eTriageCountTodayVisitors();
    this.eTriageCountTodayEmployees();
  },
  methods: {
    async eTriageCountTodayEmployees() {
      this.isDataLoaded = true;

      const response = await fetch(
        `${this.apiUrl}etriage/dashboard-etriage-today?auth=${this.apiKey}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseJson = await response.json();
      if (responseJson.length > 0) {
        this.showStatus = true;
      }

      this.apps[1]["count"] = responseJson.length;
    },
    async eTriageCountTodayVisitors() {
      const response = await fetch(
        `${this.apiUrl}etriage/dashboard-etriage-today?auth=${this.apiKey}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseJson = await response.json();

      if (responseJson.length > 0) {
        this.showStatus = true;
      }

      this.apps[0]["count"] = responseJson.length;
    },
  },
};
</script>

<style></style>
