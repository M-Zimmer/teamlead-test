<template>
  <section class="section">
    <b-navbar :fixed-top="true" :spaced="true" type="is-info">
      <template slot="end">
        <b-navbar-item tag="div">
          <b-button
            class="button is-medium is-info"
            @click="this.rightBtnClicked"
          >
            {{ this.rightBtnLabel }}
          </b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AppHeader",
  computed: mapState({
    rightBtnRoute(state) {
      const { name } = this.$route;
      switch (name) {
        case "Posts":
          if (state.user.id !== -1) return "Posts";
          else return "Login";
        case "Login":
        case "CreateEditPost":
          return "Posts";
        default:
          return "";
      }
    },
    rightBtnLabel(state) {
      const { name } = this.$route;
      switch (name) {
        case "Posts":
          if (state.user.id !== -1) return "Log out";
          else return "Login";
        case "Login":
        case "CreateEditPost":
          return "Cancel";
        default:
          return "Action";
      }
    }
  }),
  methods: {
    ...mapActions(["signOut"]),
    rightBtnClicked() {
      if (this.rightBtnRoute === "Posts" && this.$route.name === "Posts")
        this.signOut();

      if (this.$route.name !== this.rightBtnRoute)
        this.$router.push({ name: this.rightBtnRoute });
    }
  }
};
</script>

<style scoped></style>
