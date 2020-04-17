<template>
  <section
    id="app"
    class="section is-overlay is-family-primary has-background-grey-lighter"
  >
    <AppHeader />
    <router-view />
  </section>
</template>

<script>
import { mapActions } from "vuex";
import AppHeader from "./components/AppHeader";
export default {
  name: "App",
  methods: mapActions(["loadUser"]),
  components: {
    AppHeader
  },
  mounted() {
    if (localStorage.getItem("credentialsSaved") === "true") this.loadUser();
  }
};
</script>

<style>
html {
  overflow-y: hidden !important;
}
#app {
  background-color: aquamarine;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-y: auto;
}
</style>
