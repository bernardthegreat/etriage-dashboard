<template>
  <div class="table-responsive" style="max-height:70vh">
    <table class="table table-striped table-hover table-condensed table-dark m-0">
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Age</th>
          <th>Position</th>
          <th>Department</th>
          <th>Symptoms and History</th>
          <th>Temperature</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:class="{'bg-danger':checkIfCovidEr(emp)}" v-bind:key="key" v-for="(emp,key) in persons">
          <td>{{emp.code}}</td>
          <td>{{emp.name}}</td>
          <td>{{emp.age}}</td>
          <td>{{emp.position}}</td>
          <td>{{emp.department}}</td>
          <td>{{emp.symotomsAndHistory != null ? emp.symotomsAndHistory.replace(/_/g,' ').toUpperCase().split(';').join(', ') : ''}}</td>
          <td>{{emp.temperature}}</td>
          <td> 
            <button class="btn btn-success" v-if="checkIfCovidEr(emp)" v-on:click="clearEmployee(emp.code)">
              <i class="fa fa-check"> </i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["persons"],
  methods:{
    checkIfCovidEr(employee){
      if(employee.isForCovidEr == 1){
        return true;
      }
      return false;
    },
    clearEmployee(code){
      console.log(code);
    }
  }
};
</script>

<style scoped>
</style>