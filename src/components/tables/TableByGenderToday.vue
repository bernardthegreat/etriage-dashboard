<template>
  <div class="container">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">ETriage Employees Today By Gender</h1>
    </div>
    <div class="card-deck mb-12 text-center">
      <div class="card mb-4 shadow-sm">
        <div class="card-body">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li
              class="nav-item"
              v-bind:key="index" v-for="(tab, index) in eTriageByGenderCountToday"
              @click="currentTab = index"
              :class="{active: currentTab === index}"
            >
              <a
                class="nav-link"
                id="pills-home-tab"
                data-toggle="pill"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <span v-if="tab['gender'] === 'N/A'">N/A</span>
                <span v-else-if="tab['gender'] === 'F'">FEMALE</span>
                <span v-else-if="tab['gender'] === 'M'">MALE</span>
              </a>
            </li>
          </ul>
          <div class="tab-content" id>
            <div class v-show="currentTab === 0">
              <div style="height: 400px; overflow-y: auto;">
                <table id class="table table-striped table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col" width="20%">Name</th>
                      <th scope="col">Age</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Position</th>
                      <th scope="col">Department</th>
                      <th scope="col">Class</th>
                      <th scope="col">Temperature</th>
                      <th scope="col">Symptoms and History</th>
                      <th scope="col">For ER</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-bind:key="key" v-for="(eTriageHistoricalResult, key) in eTriageByGenderCountToday[0]['details']">
                      <td>{{eTriageHistoricalResult.code}}</td>
                      <td>{{eTriageHistoricalResult.name}}</td>
                      <td>{{eTriageHistoricalResult.age}}</td>
                      <td>{{eTriageHistoricalResult.gender}}</td>
                      <td>{{eTriageHistoricalResult.position}}</td>
                      <td>{{eTriageHistoricalResult.department}}</td>
                      <td>{{eTriageHistoricalResult.class}}</td>
                      <td>{{eTriageHistoricalResult.temperature}}</td>
                      <td v-html="eTriageHistoricalResult.symotomsAndHistory"></td>
                      <td>
                        <span v-if="eTriageHistoricalResult['isForCovidEr'] === 0">N/A</span>
                        <span v-else-if="eTriageHistoricalResult['isForCovidEr'] === 1">For ER</span>
                      </td>
                      <td>{{eTriageHistoricalResult.date}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class v-show="currentTab === 1">
              <div style="height: 400px; overflow-y: auto;">
                <table id class="table table-striped table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col" width="20%">Name</th>
                      <th scope="col">Age</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Position</th>
                      <th scope="col">Department</th>
                      <th scope="col">Class</th>
                      <th scope="col">Temperature</th>
                      <th scope="col">Symptoms and History</th>
                      <th scope="col">For ER</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-bind:key="key" v-for="(eTriageHistoricalResult, key) in eTriageByGenderCountToday[1]['details']">
                      <td>{{eTriageHistoricalResult.code}}</td>
                      <td>{{eTriageHistoricalResult.name}}</td>
                      <td>{{eTriageHistoricalResult.age}}</td>
                      <td>{{eTriageHistoricalResult.gender}}</td>
                      <td>{{eTriageHistoricalResult.position}}</td>
                      <td>{{eTriageHistoricalResult.department}}</td>
                      <td>{{eTriageHistoricalResult.class}}</td>
                      <td>{{eTriageHistoricalResult.temperature}}</td>
                      <td v-html="eTriageHistoricalResult.symotomsAndHistory"></td>
                      <td>
                        <span v-if="eTriageHistoricalResult['isForCovidEr'] === 0">N/A</span>
                        <span v-else-if="eTriageHistoricalResult['isForCovidEr'] === 1">For ER</span>
                      </td>
                      <td>{{eTriageHistoricalResult.date}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class v-show="currentTab === 2">
              <div style="height: 400px; overflow-y: auto;">
                <table id class="table table-striped table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Code</th>
                      <th scope="col" width="20%">Name</th>
                      <th scope="col">Age</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Position</th>
                      <th scope="col">Department</th>
                      <th scope="col">Class</th>
                      <th scope="col">Temperature</th>
                      <th scope="col">Symptoms and History</th>
                      <th scope="col">For ER</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-bind:key="key" v-for="(eTriageHistoricalResult, key) in eTriageByGenderCountToday[2]['details']">
                      <td>{{eTriageHistoricalResult.date}}</td>
                      <td>{{eTriageHistoricalResult.code}}</td>
                      <td>{{eTriageHistoricalResult.name}}</td>
                      <td>{{eTriageHistoricalResult.age}}</td>
                      <td>{{eTriageHistoricalResult.gender}}</td>
                      <td>{{eTriageHistoricalResult.position}}</td>
                      <td>{{eTriageHistoricalResult.department}}</td>
                      <td>{{eTriageHistoricalResult.class}}</td>
                      <td>{{eTriageHistoricalResult.temperature}}</td>
                      <td v-html="eTriageHistoricalResult.symotomsAndHistory"></td>
                      <td>
                        <span v-if="eTriageHistoricalResult['isForCovidEr'] === 0">N/A</span>
                        <span v-else-if="eTriageHistoricalResult['isForCovidEr'] === 1">For ER</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["apiKey", "apiUrl"],
  data() {
    return {
      eTriageByGenderCountToday: '',
      currentTab: 0,
    };
  },
  created() {
    this.eTriageCountToday();
  },
  methods: {
    async eTriageCountToday() {
      const response = await fetch(
        `${this.apiUrl}etriage/dashboard-etriage-today?auth=${this.apiKey}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const responseJson = await response.json();
      let male = responseJson.filter(item => item.gender == "M");
      let female = responseJson.filter(item => item.gender == "F");
      let none = responseJson.filter(item => item.gender == null);
      if (responseJson.length > 0) {
        this.showStatus = true;
      }

      const genderMap = [
        {
          gender: "F",
          count: female.length,
          details: female
        },
        {
          gender: "M",
          count: male.length,
          details: male
        },
        {
          gender: "N/A",
          count: none.length,
          details: none
        }
      ];

      this.eTriageByGenderCountToday = genderMap;
    }
  }
};
</script>

<style scoped>
</style>