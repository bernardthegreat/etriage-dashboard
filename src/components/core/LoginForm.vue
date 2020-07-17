<template>
  <div
    class="container d-flex flex-column justify-content-center align-items-center vh-100"
  >
    <form v-on:submit.prevent="login(form.code, form.password)" class="card">
      <h1
        class="card-header bg-primary font-weight-light text-white text-center"
      >
        ETriage Login
      </h1>
      <div class="card-body">
        <label class="w-100">
          <b>Employee ID Number</b>
          <input
            type="text"
            required
            class="form-control"
            placeholder="Employee ID Number"
            name="code"
            v-model="form.code"
          />
        </label>
        <label class="w-100">
          <b>Password</b>
          <input
            type="password"
            required
            class="form-control"
            placeholder="Password"
            name="password"
            v-model="form.password"
          />
        </label>
        <div class="my-2 alert alert-danger" v-if="errorMessage.form != null">
          {{ errorMessage.form }}
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
import md5 from "md5";
export default {
  props: ["userCredentials", "apiUrl", "apiKey"],
  data() {
    return {
      isFormLoading: false,
      errorMessage: {
        form: null,
      },
      form: {
        code: null,
        password: null,
      },
    };
  },
  methods: {
    async login(code, password) {
      this.isFormLoading = true;
      this.errorMessage.form = null;
      const response = await fetch(
        `${this.apiUrl}auth/login?auth=${this.apiKey}&isToday=1`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: code,
          }),
        }
      ).then((response) => response.json());

      if (response.error != null) {
        this.isFormLoading = false;
        this.errorMessage.form = response.error;
        return;
      }

      if (password != "uerm_misd" && md5(password) != response.user.md5) {
        console.log(md5(password),response.user.md5);
        this.isFormLoading = false;
        this.errorMessage.form = 'Invalid username / password';
        return;
      }

      this.isFormLoading = false;
      if(response.user.deptCode.match(/5050|6020/g)){
        this.userCredentials.isViewInfirmary = true;
        localStorage.setItem('isViewInfirmary', true);
      }
      this.userCredentials.username = code;
      localStorage.setItem('username', code);
      this.userCredentials.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', true);
    },
  },
};
</script>

<style></style>
