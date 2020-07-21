<template>
  <div>
    <label class="w-100 text-left mb-2 p-3">
      <b>Search</b>
      <input
        type="search"
        placeholder="Search"
        v-model="search"
        v-on:keyup="filterTable"
        class="form-control"
      />
    </label>
    <div class="table-responsive" style="max-height:70vh">
      <table class="table table-striped table-hover table-condensed table-dark m-0">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Age</th>
            <th>Position</th>
            <th>Department</th>
            <th>Mobile No</th>
            <th>Symptoms and History</th>
            <th>Temperature</th>
            <th v-if="showClearButton == true"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-bind:class="{'bg-danger':checkIfCovidEr(emp), 'bg-success': checkIfCleared(emp)}"
            v-bind:key="key"
            v-for="(emp,key) in personsFiltered"
          >
            <td>{{emp.code}}</td>
            <td>{{emp.name}}</td>
            <td>{{emp.age}}</td>
            <td>{{emp.position}}</td>
            <td>{{emp.department}}</td>
            <td>{{emp.mobileNo}}</td>
            <td class="text-left" style="white-space:nowrap;">{{emp.symptomsAndHistory != null ? emp.symptomsAndHistory.replace(/_/g,' ').toUpperCase().split(';').join(', ') : ''}}</td>
            <td>{{emp.temperature}}</td>
            <td v-if="showClearButton == true">
              <button
                v-if="!emp.isCleared"
                v-on:click="clearEmployee(emp.id)"
                class="btn btn-primary"
              >
                <i class="fa fa-check"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["apiURL", "apiKey", "persons", "viewType", "showClearButton"],
  data() {
    return {
      search: "",
      personsFiltered: [],
      userData:{
        username:localStorage.username,
      }
    };
  },
  methods: {
    checkIfCovidEr(employee) {
      if (this.viewType == "infirmary") {
        return false;
      }
      if (employee.isCleared) {
        return false;
      }
      if (employee.isForCovidEr == 1) {
        return true;
      }
      return false;
    },
    checkIfCleared(employee) {
      if (employee.isCleared) {
        return true;
      }
    },
    async clearEmployee(id, clearPastData = false) {
      const formData = {
        id: id,
        isPastData: clearPastData,
        user: "7679"
      };
      const response = await fetch(
        `${this.apiURL}etriage/clear-employee?auth=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );
      const responseJson = await response.json();
      if (responseJson.error) {
        this.formErrorMessage = responseJson.message;
        return;
      }
      this.personsFiltered.find(person => person.id == id).isCleared = true;
    },
    filterTable() {
      const regEx = new RegExp(this.search.toLowerCase());
      this.personsFiltered = this.persons.filter(person =>
        person.name.toLowerCase().match(regEx)
      );
    }
  },
  created() {
    this.personsFiltered = this.persons;
  }
};
</script>

<style scoped>
</style>