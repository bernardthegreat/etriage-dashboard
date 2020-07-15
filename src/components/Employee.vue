<template>
  <div class="container py-5">
    <div v-if="!isDataLoaded" class="py-5 text-center">
      <div>
        <b class="fa fa-spinner fa-spin fa-5x"></b>
      </div>
      <div>
        <p>FETCHING DATA ...</p>
      </div>
    </div>
    <div v-if="isDataLoaded">
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">ETriage Employee Dashboard</h1>
      </div>
      <div class="card-deck mb-12 text-center">
        <div class="card mb-3 shadow-sm">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">
              Employees Today {{ currentDate }}
            </h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">
              {{ eTriageEmployeeCountToday }}
            </h1>
            <button
              type="button"
              v-on:click.prevent="changeRoute('eTriageToday')"
              class="btn btn-lg btn-block btn-primary"
            >
              See Detailed Data
            </button>

          </div>
        </div>
      </div>

      <div class="card my-5" v-if="eTriageEmployees.forCovidEr.length > 0">
        <div class="card-header bg-danger text-white">
          <h4 class="text-center my-0 font-weight-normal">For Covid ER Report: {{eTriageEmployees.forCovidEr.length}}</h4>
        </div>
        <div class="table-responsive" style="max-height:70vh">
          <table class="table table-striped table-hover table-condensed table-dark m-0">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Symptoms and History</th>
                <th>Temperature</th>
              </tr>
            </thead>
            <tbody>
              <tr v-bind:key="key" v-for="(emp,key) in eTriageEmployees.forCovidEr">
                <td>{{emp.code}}</td>
                <td>{{emp.name}}</td>
                <td>{{emp.position}}</td>
                <td>{{emp.department}}</td>
                <td>{{emp.symotomsAndHistory != null ? emp.symotomsAndHistory.replace(/_/g,' ').toUpperCase().split(';').join(', ') : ''}}</td>
                <td>{{emp.temperature}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card-deck mb-12 text-center">
        <div
          class="card mb-4 shadow-sm"
          v-bind:key="key"
          v-for="(eTriageByGenderCount, key) in eTriageByGenderCountToday"
        >
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">
              <span v-if="eTriageByGenderCount['gender'] === 'N/A'"
                >OTHERS</span
              >
              <span v-else-if="eTriageByGenderCount['gender'] === 'F'"
                >FEMALE</span
              >
              <span v-else-if="eTriageByGenderCount['gender'] === 'M'"
                >MALE</span
              >
            </h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">
              {{ eTriageByGenderCount["count"] }}
            </h1>

            <button
              type="button"
              v-on:click.prevent="changeRoute('eTriageByGenderToday')"
              class="btn btn-lg btn-block btn-info"
            >
              See Detailed Data
            </button>
          </div>
        </div>
      </div>

      <div class="card-deck mb-12 text-center">
        <div
          class="card mb-4 shadow-sm"
          v-bind:key="key"
          v-for="(eTriageByClassCount, key) in eTriageByClassCountToday"
        >
          <div class="card-header">
            <h5 class="my-0 font-weight-normal">
              {{ eTriageByClassCount["class"] }}
            </h5>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">
              {{ eTriageByClassCount["count"] }}
            </h1>

            <button type="button" class="btn btn-lg btn-block btn-warning">
              See More
            </button>
          </div>
        </div>
      </div>

      <div class="card-deck mb-12 text-center">
        <div
          class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"
        >
          <h2 class="display-4">Historical Data</h2>
        </div>
      </div>
      <div class="card-deck mb-12 text-center">
        <div class="card">
          <div class="card-header">
            <span class="float-left">
              Click the
              <em>Names</em> to filter
            </span>
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
          <div class="card-body">
            <div style="height: 400px; overflow-y: auto;">
              <table
                id="table-table"
                class="table table-striped table-hover text-center"
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
                    >
                      {{ eTriageHistoricalResult.name }}
                    </td>
                    <td>{{ eTriageHistoricalResult.age }}</td>
                    <td>{{ eTriageHistoricalResult.gender }}</td>
                    <td>{{ eTriageHistoricalResult.position }}</td>
                    <td>{{ eTriageHistoricalResult.department }}</td>
                    <td>{{ eTriageHistoricalResult.class }}</td>
                    <td>{{ eTriageHistoricalResult.temperature }}</td>
                    <td
                      v-html="eTriageHistoricalResult.symotomsAndHistory"
                    ></td>
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
export default {
  props: ["apiKey", "apiUrl","changeRoute"],

  data() {
    return {
      eTriageEmployees:{
        master:[],
        forCovidEr:[],
        male:[],
        female:[],
        faculty:[],
        rankAndFile:[],
        management:[],
        officer:[],
        resident:[],
      },
      eTriageEmployeeCountDetailedToday: "",
      eTriageEmployeeCountToday: "",
      eTriageByGenderDetailedToday: "",
      eTriageByGenderCountToday: "",
      eTriageByClassDetailedToday: "",
      eTriageByClassCountToday: "",
      eTriageHistorical: "",
      eTriageHistoricalFilter: "",
      isFiltered: false,
      currentPage: "/",
      isDataLoaded: false,
      currentTab: 0,
      currentDate: new Date().toISOString().substring(0, 10),
    };
  },

  created() {
    this.eTriageCountToday();
    this.eTriageCountTodayByClass();
    this.eTriageHistoricalData();
  },
  methods: {
    initValues() {
      this.currentPage = "/";
    },
    filterHistory(name) {
      if (this.isFiltered) {
        this.isFiltered = false;
        this.eTriageHistoricalFilter = this.eTriageHistorical;
        return;
      }
      this.eTriageHistoricalFilter = this.eTriageHistoricalFilter.filter(
        (item) => item.name == name
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
          headers: { "Content-Type": "application/json" },
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
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseJson = await response.json();
      let male = responseJson.filter((item) => item.gender == "M");
      let female = responseJson.filter((item) => item.gender == "F");
      let none = responseJson.filter((item) => item.gender == null);
      if (responseJson.length > 0) {
        this.showStatus = true;
      }

      const genderMap = [
        {
          gender: "F",
          count: female.length,
          details: female,
        },
        {
          gender: "M",
          count: male.length,
          details: male,
        },
        {
          gender: "N/A",
          count: none.length,
          details: none,
        },
      ];

      this.eTriageByGenderCountToday = genderMap;
      this.eTriageEmployeeCountToday = responseJson.length;
      this.eTriageEmployees.master = responseJson;
      this.eTriageEmployees.master.sort((a, b) => (a.name > b.name) ? 1 : -1);
      this.eTriageEmployees.forCovidEr = this.eTriageEmployees.master.filter((result)=>result.isForCovidEr == 1);
      this.eTriageEmployees.male = this.eTriageEmployees.master.filter((result)=>result.gender == 'M');
      this.eTriageEmployees.female = this.eTriageEmployees.master.filter((result)=>result.gender == 'F');
      this.eTriageEmployees.management = this.eTriageEmployees.master.filter((result)=>result.class == 'MANAGEMENT');
      this.eTriageEmployees.rankAndFile = this.eTriageEmployees.master.filter((result)=>result.class == 'RANK AND FILE');
      this.eTriageEmployees.officer = this.eTriageEmployees.master.filter((result)=>result.class == 'OFFICER');
      this.eTriageEmployees.resident = this.eTriageEmployees.master.filter((result)=>result.class == 'RESIDENT/PGI');
      this.eTriageEmployees.faculty = this.eTriageEmployees.master.filter((result)=>result.class == 'FACULTY');
    },
    async eTriageCountTodayByClass() {
      this.isFormLoading = true;

      const response = await fetch(
        `${this.apiUrl}etriage/dashboard-etriage-by-class?auth=${this.apiKey}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseJson = await response.json();

      if (responseJson.length > 0) {
        this.showStatus = true;
      }

      this.eTriageByClassCountToday = responseJson;
    },
  },
};
</script>

<style scoped></style>
