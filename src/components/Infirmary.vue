<template>
  <div class="container py-5">
    <div v-if="!isDataLoaded" class="py-5 text-center">
      <div>
        <b class="fa fa-spinner fa-spin fa-5x"></b>
      </div>
      <div>
        <p class="lead m-3">Please wait while we fetch the results...</p>
      </div>
    </div>
    <div v-if="isDataLoaded">
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">ETriage Infirmary</h1>
      </div>
      <div class="card-deck mb-12 text-center">
        <div class="card">
          <div class="card-header bg-danger text-white">
            <h4>For Covid ER Report: {{eTriageEmployees.forCovidEr.length}}</h4>
          </div>
          <Detailed
            v-bind:persons="eTriageEmployees.forCovidEr"
            v-bind:apiURL="apiUrl"
            v-bind:apiKey="apiKey"
            v-bind:viewType="'infirmary'"
            v-bind:showClearButton="true"
            v-if="eTriageEmployees.forCovidEr.length > 0"
          />
        </div>
      </div>
      <div
        class="d-flex flex-wrap justify-content-around"
        style="margin-left:-16px; margin-right:-16px;"
      >
        <div class="card bg-dark text-white m-3 flex-grow-1">
          <h4 class="card-header bg-secondary text-center">Officer</h4>
          <div class="display-4 p-5 text-center">{{eTriageEmployees.officer.length}}</div>
          <Detailed v-bind:persons="eTriageEmployees.officer" v-if="isDetailsShown.officer" />
          <a
            href="#"
            v-on:click.prevent="toggleDetails('officer')"
            class="card-footer text-center text-white bg-secondary"
          >{{isDetailsShown.officer ? 'Hide' : 'Show'}} details</a>
        </div>
        <div class="card bg-dark text-white m-3 flex-grow-1">
          <h4 class="card-header bg-secondary text-center">Management</h4>
          <div class="display-4 p-5 text-center">{{eTriageEmployees.management.length}}</div>
          <Detailed v-bind:persons="eTriageEmployees.management" v-if="isDetailsShown.management" />
          <a
            href="#"
            v-on:click.prevent="toggleDetails('management')"
            class="card-footer text-center text-white bg-secondary"
          >{{isDetailsShown.management ? 'Hide' : 'Show'}} details</a>
        </div>
        <div class="card bg-dark text-white m-3 flex-grow-1">
          <h4 class="card-header bg-secondary text-center">Rank and File</h4>
          <div class="display-4 p-5 text-center">{{eTriageEmployees.rankAndFile.length}}</div>
          <Detailed
            v-bind:persons="eTriageEmployees.rankAndFile"
            v-if="isDetailsShown.rankAndFile"
          />
          <a
            href="#"
            v-on:click.prevent="toggleDetails('rankAndFile')"
            class="card-footer text-center text-white bg-secondary"
          >{{isDetailsShown.rankAndFile ? 'Hide' : 'Show'}} details</a>
        </div>
        <div class="card bg-dark text-white m-3 flex-grow-1">
          <h4 class="card-header bg-secondary text-center">Faculty</h4>
          <div class="display-4 p-5 text-center">{{eTriageEmployees.faculty.length}}</div>
          <Detailed v-bind:persons="eTriageEmployees.faculty" v-if="isDetailsShown.faculty" />
          <a
            href="#"
            v-on:click.prevent="toggleDetails('faculty')"
            class="card-footer text-center text-white bg-secondary"
          >{{isDetailsShown.faculty ? 'Hide' : 'Show'}} details</a>
        </div>
        <div class="card bg-dark text-white m-3 flex-grow-1">
          <h4 class="card-header bg-secondary text-center">Residents/PGI</h4>
          <div class="display-4 p-5 text-center">{{eTriageEmployees.resident.length}}</div>
          <Detailed
            v-bind:persons="eTriageEmployees.resident"
            v-bind:viewType="'infirmary'"
            v-if="isDetailsShown.resident"
          />
          <a
            href="#"
            v-on:click.prevent="toggleDetails('resident')"
            class="card-footer text-center text-white bg-secondary"
          >{{isDetailsShown.resident ? 'Hide' : 'Show'}} details</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Detailed from "../components/tables/Detailed";
export default {
  props: ["apiKey", "apiUrl", "changeRoute"],
  components: {
    Detailed
  },
  data() {
    return {
      eTriageEmployees: {
        master: [],
        forCovidEr: [],
        faculty: [],
        rankAndFile: [],
        management: [],
        officer: [],
        resident: []
      },
      isDetailsShown: {
        faculty: false,
        rankAndFile: false,
        management: false,
        officer: false,
        resident: false
      },
      isDataLoaded: false
    };
  },
  created() {
    this.getForEREmployees();
  },
  methods: {
    toggleDetails(toggle) {
      if (this.eTriageEmployees[toggle].length == 0) {
        return;
      }
      const status = this.isDetailsShown[toggle];
      this.isDetailsShown.faculty = false;
      this.isDetailsShown.rankAndFile = false;
      this.isDetailsShown.management = false;
      this.isDetailsShown.officer = false;
      this.isDetailsShown.resident = false;
      this.isDetailsShown[toggle] = !status;
    },
    async getForEREmployees() {
      this.isDataLoaded = true;
      const response = await fetch(
        `${this.apiUrl}etriage/dashboard?auth=${this.apiKey}&isToday=1`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const responseJson = await response.json();
      if (responseJson.length > 0) {
        this.showStatus = true;
      }
      this.eTriageEmployees.master = responseJson;
      this.eTriageEmployees.master.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.eTriageEmployees.forCovidEr = this.eTriageEmployees.master.filter(
        result => result.isForCovidEr == 1
      );
      this.eTriageEmployees.management = this.eTriageEmployees.forCovidEr.filter(
        result => result.class == "MANAGEMENT"
      );
      this.eTriageEmployees.rankAndFile = this.eTriageEmployees.forCovidEr.filter(
        result => result.class == "RANK AND FILE"
      );
      this.eTriageEmployees.officer = this.eTriageEmployees.forCovidEr.filter(
        result => result.class == "OFFICER"
      );
      this.eTriageEmployees.resident = this.eTriageEmployees.forCovidEr.filter(
        result => result.class == "RESIDENT/PGI"
      );
      this.eTriageEmployees.faculty = this.eTriageEmployees.forCovidEr.filter(
        result => result.class == "FACULTY"
      );
    }
  }
};
</script>

<style scoped>
</style>