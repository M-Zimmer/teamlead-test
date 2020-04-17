<template>
  <div class="card">
    <div class="card-content">
      <b-field label="Title">
        <b-input v-model="title" :disabled="loading" />
      </b-field>
      <b-field label="Description">
        <b-input v-model="description" :disabled="loading" type="textarea" />
      </b-field>
    </div>
    <footer class="card-footer">
      <p class="control card-footer-item">
        <b-button
          class="is-fullwidth is-info"
          :disabled="loading"
          :loading="loading"
          @click="onSave"
        >
          <span class="title is-6 has-text-white">Save</span>
        </b-button>
      </p>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { userRoles } from "../store/mutation-types";
export default {
  name: "CreateEditPostForm",
  data() {
    const { query } = this.$route;
    if (query.edit)
      return {
        title: query.post.title,
        description: query.post.description,
        loading: false
      };
    else
      return {
        title: "",
        description: "",
        loading: false
      };
  },
  methods: {
    ...mapActions(["createPost", "updatePost"]),
    async onSave() {
      const {
        $route: { query },
        title,
        description
      } = this;
      let method = null;
      if (query.create) {
        this.loading = true;
        method = this.createPost({
          options: {
            title,
            description
          }
        });
      } else if (query.edit) {
        this.loading = true;
        method = this.updatePost({
          id: query.post.id,
          options: {
            title,
            description
          }
        });
      }
      try {
        await method;
        this.$router.push({ name: "Posts" });
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    ...mapState(["user"])
  },
  mounted() {
    const { query } = this.$route;

    if (
      (!query.create && !query.edit) ||
      (query.create && this.user.role !== userRoles.Writer) ||
      (query.edit && this.user.id !== query.post.userId)
    ) {
      this.$router.push({ name: "Posts" });
    }
  }
};
</script>

<style scoped></style>
