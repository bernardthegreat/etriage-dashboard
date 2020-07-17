<template>
  <div class="d-flex flex-column justify-content-center align-items-center vh-100">
    <form v-on:submit.prevent="login" class="card">
      <h1 class="card-header bg-primary font-weight-light text-white text-center">ETriage Login</h1>
      <div class="card-body">
        <label class="w-100">
          <b>Employee ID Number</b>
          <input type="text" required class="form-control" placeholder="Employee ID Number" name="code"
            v-model="form.code" />
        </label>
        <label class="w-100">
          <b>Password</b>
          <input type="password" required class="form-control" placeholder="Password" name="password"
            v-model="form.password" />
        </label>
        <div class="my-2 alert alert-danger" v-if="errorMessage.form != null">
          {{errorMessage.form}}
        </div>
      </div>
      <div class="card-footer text-center p-0">
        <div v-if="!isFormLoading" class="btn-group w-100">
          <button class="btn btn-primary">
            <b class="fa fa-sign-in"></b> Login
          </button>
        </div>
        <b v-if="isFormLoading" class="p-3 fa fa-spinner fa-spin"></b>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["login"],
  data() {
    return{
      isFormLoading: false,
      errorMessage: {
        form: null,
      },
      form: {
        code: null,
        password: null,
      }
    }
  },
}
</script>

<style>
</style>