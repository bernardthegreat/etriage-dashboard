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
        <h1 class="display-4">ETriage Employee Dashboard</h1>
      </div>
      <div class="card bg-dark text-white text-center">
        <div class="card-header bg-primary text-white">
          <h4>Employees Today {{ currentDate }}</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">{{ eTriageEmployees.master.length }}</h1>
        </div>
        <Detailed v-bind:persons="eTriageEmployees.master" v-if="isDetailsShown.master" />
        <a
          href="#"
          v-on:click.prevent="toggleDetails('master')"
          class="card-footer text-center text-white bg-primary"
        >{{isDetailsShown.master ? 'Hide' : 'Show'}} details</a>
      </div>

      <div class="card my-5" v-if="eTriageEmployees.forCovidEr.length > 0">
        <div class="card-header bg-danger text-white">
          <h4
            class="text-center my-0 font-weight-normal"
          >For Covid ER Report: {{eTriageEmployees.forCovidEr.length}}</h4>
        </div>
        <Detailed v-bind:persons="eTriageEmployees.forCovidEr" />
      </div>

      <div
        class="d-flex flex-wrap justify-content-around"
        style="margin-left:-16px; margin-right:-16px;"
      >
        <div class="card bg-dark text-white m-3 flex-grow-1">
          <h4 class="card-header bg-secondary text-center">Male</h4>
          <div class="display-4 p-5 text-center">{{eTriageEmployees.male.length}}</div>
          <Detailed v-bind:persons="eTriageEmployees.male" v-if="isDetailsShown.male" />
          <a
            href="#"
            v-on:click.prevent="toggleDetails('male')"
            class="card-footer text-center text-white bg-secondary"
          >{{isDetailsShown.male ? 'Hide' : 'Show'}} details</a>
        </div>
        <div class="card bg-dark text-white m-3 flex-grow-1">
          <h4 class="card-header bg-secondary text-center">Female</h4>
          <div class="display-4 p-5 text-center">{{eTriageEmployees.female.length}}</div>
          <Detailed v-bind:persons="eTriageEmployees.female" v-if="isDetailsShown.female" />
          <a
            href="#"
            v-on:click.prevent="toggleDetails('female')"
            class="card-footer text-center text-white bg-secondary"
          >{{isDetailsShown.female ? 'Hide' : 'Show'}} details</a>
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
          <Detailed v-bind:persons="eTriageEmployees.resident" v-if="isDetailsShown.resident" />
          <a
            href="#"
            v-on:click.prevent="toggleDetails('resident')"
            class="card-footer text-center text-white bg-secondary"
          >{{isDetailsShown.resident ? 'Hide' : 'Show'}} details</a>
        </div>
      </div>

      <div class="card-deck mb-12 text-center">
        <div class="card">
          <div class="card-header bg-info text-white">
            <h4>
              Historical Data
              <small>
                Click the
                <em>Names</em> to filter
              </small>
            </h4>
            <div class="btn-group float-right">
              <button
                type="button"
                class="btn btn-outline btn-success"
                title="Copy to Clipboard"
                v-on:click="copytable('table-table')"
              >
                <i class="fa fa-copy"></i>
              </button>
              <button
                type="button"
                v-if="isFiltered"
                class="btn btn-outline btn-success"
                title="Filter Off"
                v-on:click="filterOff"
              >
                <i class="fa fa-filter"></i>
              </button>
            </div>
          </div>
          <div class="table-responsive">
            <div style="max-height: 70vh;">
              <table
                id="table-table"
                class="table table-striped table-hover text-center table-dark m-0"
              >
                <thead>
                  <tr>
                    <th scope="col" width="15%">Date</th>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Position</th>
                    <th scope="col">Department</th>
                    <th scope="col">Class</th>
                    <th scope="col">Temp</th>
                    <th scope="col">Symptoms and History</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    id="results"
                    v-bind:key="key"
                    v-for="(eTriageHistoricalResult,
                    key) in eTriageHistoricalFilter"
                    v-bind:class="[
                      eTriageHistoricalResult.isForCovidEr === 1
                        ? 'font-weight-bold text-red'
                        : '',
                    ]"
                  >
                    <td>{{ eTriageHistoricalResult.date }}</td>
                    <td>{{ eTriageHistoricalResult.code }}</td>
                    <td
                      class="name"
                      v-on:click="filterHistory(eTriageHistoricalResult.name)"
                    >{{ eTriageHistoricalResult.name }}</td>
                    <td>{{ eTriageHistoricalResult.age }}</td>
                    <td>{{ eTriageHistoricalResult.gender }}</td>
                    <td>{{ eTriageHistoricalResult.position }}</td>
                    <td>{{ eTriageHistoricalResult.department }}</td>
                    <td>{{ eTriageHistoricalResult.class }}</td>
                    <td>{{ eTriageHistoricalResult.temperature }}</td>
                    <td v-html="eTriageHistoricalResult.symotomsAndHistory"></td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
        male: [],
        female: [],
        faculty: [],
        rankAndFile: [],
        management: [],
        officer: [],
        resident: []
      },
      isDetailsShown: {
        master: false,
        forCovidEr: false,
        male: false,
        female: false,
        faculty: false,
        rankAndFile: false,
        management: false,
        officer: false,
        resident: false
      },
      eTriageHistorical: "",
      eTriageHistoricalFilter: "",
      isFiltered: false,
      currentPage: "/",
      isDataLoaded: false,
      currentTab: 0,
      currentDate: new Date().toISOString().substring(0, 10)
    };
  },
  created() {
    this.eTriageCountToday();
    this.eTriageHistoricalData();
  },
  methods: {
    initValues() {
      this.currentPage = "/";
    },
    toggleDetails(toggle) {
      if(this.eTriageEmployees[toggle].length == 0){
        return;
      }
      const status = this.isDetailsShown[toggle];
      this.isDetailsShown.master = false;
      this.isDetailsShown.forCovidEr = false;
      this.isDetailsShown.male = false;
      this.isDetailsShown.female = false;
      this.isDetailsShown.faculty = false;
      this.isDetailsShown.rankAndFile = false;
      this.isDetailsShown.management = false;
      this.isDetailsShown.officer = false;
      this.isDetailsShown.resident = false;
      this.isDetailsShown[toggle] = !status;
    },
    filterHistory(name) {
      if (this.isFiltered) {
        this.isFiltered = false;
        this.eTriageHistoricalFilter = this.eTriageHistorical;
        return;
      }
      this.eTriageHistoricalFilter = this.eTriageHistoricalFilter.filter(
        item => item.name == name
      );
      this.isFiltered = true;
    },
    copytable(element) {
      var urlField = document.getElementById(element);
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(urlField);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
    },
    filterOff() {
      this.isFiltered = false;
      this.eTriageHistoricalFilter = this.eTriageHistorical;
    },
    async eTriageHistoricalData() {
      const response = await fetch(
        `${this.apiUrl}etriage/dashboard?auth=${this.apiKey}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const responseJson = await response.json();
      for (var result of responseJson) {
        if (result.symotomsAndHistory != null) {
          let symptoms = result.symotomsAndHistory
            .replace(/[_]/g, " ")
            .toUpperCase()
            .split(";")
            .join("</div><div>");
          result.symotomsAndHistory = `<div>${symptoms}</div>`;
        } else {
          result.symotomsAndHistory = "N/A";
        }

        var datetime = new Date(result.date);
        var now = datetime
          .toISOString()
          .replace("Z", " ")
          .replace("T", " ");
        var dt = new Date(now);
        var hours = dt.getHours();
        var AmOrPm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        var minutes = dt.getMinutes();
        let formatted_date =
          dt.getFullYear() +
          "-" +
          (dt.getMonth() + 1) +
          "-" +
          dt.getDate() +
          " " +
          hours +
          ":" +
          minutes +
          AmOrPm;
        result.date = formatted_date;
      }

      if (responseJson.length > 0) {
        this.showStatus = true;
      }
      (this.isDataLoaded = true), (this.eTriageHistorical = responseJson);
      this.eTriageHistoricalFilter = responseJson;
    },
    async eTriageCountToday() {
      const response = await fetch(
        `${this.apiUrl}etriage/dashboard-etriage-today?auth=${this.apiKey}`,
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
      this.eTriageEmployees.male = this.eTriageEmployees.master.filter(
        result => result.gender == "M"
      );
      this.eTriageEmployees.female = this.eTriageEmployees.master.filter(
        result => result.gender == "F"
      );
      this.eTriageEmployees.management = this.eTriageEmployees.master.filter(
        result => result.class == "MANAGEMENT"
      );
      this.eTriageEmployees.rankAndFile = this.eTriageEmployees.master.filter(
        result => result.class == "RANK AND FILE"
      );
      this.eTriageEmployees.officer = this.eTriageEmployees.master.filter(
        result => result.class == "OFFICER"
      );
      this.eTriageEmployees.resident = this.eTriageEmployees.master.filter(
        result => result.class == "RESIDENT/PGI"
      );
      this.eTriageEmployees.faculty = this.eTriageEmployees.master.filter(
        result => result.class == "FACULTY"
      );
    }
  }
};
</script>

<style scoped></style>
