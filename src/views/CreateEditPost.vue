<template>
  <section class="section view">
    <div class="container" style="max-width: 768px">
      <CreateEditPostForm />
    </div>
  </section>
</template>

<script>
import CreateEditPostForm from "../components/CreateEditPostForm";
export default {
  name: "CreateEditPost",
  components: {
    CreateEditPostForm
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
