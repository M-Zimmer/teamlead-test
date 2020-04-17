<template>
  <section class="section view">
    <div class="container" style="max-width: 768px">
      <LoginForm />
    </div>
  </section>
</template>

<script>
import LoginForm from "../components/LoginForm";
export default {
  name: "Login",
  components: {
    LoginForm
  }
};
</script>

<style scoped>
.view {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
</style>
