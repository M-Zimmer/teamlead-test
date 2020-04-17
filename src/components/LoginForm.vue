<template>
  <div class="card">
    <div class="card-content">
      <b-field
        label="Username"
        :type="{ 'is-danger': invalidLogin }"
        :message="{ 'Username not found': invalidLogin }"
      >
        <b-input
          :disabled="loading"
          v-model="login"
          @input="invalidLogin = false"
          @keypress.native="onKeyPress"
        ></b-input>
      </b-field>
      <b-field
        label="Password"
        :type="{ 'is-danger': invalidPassword }"
        :message="[{ 'Incorrect password': invalidPassword }]"
      >
        <b-input
          :disabled="loading"
          v-model="password"
          @input="invalidPassword = false"
          @keypress.native="onKeyPress"
          type="password"
        ></b-input>
      </b-field>
    </div>
    <footer class="card-footer">
      <p class="control card-footer-item">
        <b-button
          class="is-fullwidth is-info"
          :loading="loading"
          :disabled="loading"
          @click="onSubmit"
        >
          <span class="title is-6 has-text-white">Submit</span>
        </b-button>
      </p>
    </footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import data from "../data/db.json";
export default {
  name: "LoginForm",
  data: () => {
    return {
      login: "",
      password: "",
      invalidLogin: false,
      invalidPassword: false,
      loading: false
    };
  },
  methods: {
    ...mapActions(["signIn"]),
    async onSubmit() {
      const { users } = data;
      const foundUser = users.find(user => user.login === this.login);
      if (!foundUser) {
        this.invalidLogin = true;
        return;
      }
      if (foundUser.password.toString() !== this.password) {
        this.invalidPassword = true;
        return;
      }
      try {
        this.loading = true;
        await this.signIn({
          login: this.login,
          password: this.password
        });
        this.$router.push({ name: "Posts" });
      } finally {
        this.loading = false;
      }
    },
    onKeyPress({ key }) {
      if (key.toLowerCase() === "enter") this.onSubmit();
    }
  }
};
</script>

<style scoped></style>
