<template>
  <section class="section">
    <div class="container posts-main">
      <p class="control">
        <b-button
          class="has-background-info"
          v-if="user.role === userRoles.Writer"
          @click="
            $router.push({ name: 'CreateEditPost', query: { create: true } })
          "
        >
          <span class="title is-size-6 has-text-white">New post...</span>
        </b-button>
      </p>
      <PostsList :posts="currentRange" />
      <b-pagination
        class="has-text-info"
        :total="posts.length"
        :range-before="3"
        :range-after="1"
        :current.sync="current"
        order="is-centered"
        :per-page="10"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <b-pagination-button
          :class="{
            'has-text-info': true,
            'has-background-light': props.page.number === current
          }"
          :style="{
            borderColor:
              props.page.number === current
                ? 'hsl(204, 86%, 53%)' // is-info color
                : 'transparent'
          }"
          slot-scope="props"
          :page="props.page"
          :id="`page${props.page.number}`"
        >
          {{ props.page.number }}
        </b-pagination-button>
      </b-pagination>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PostsList from "../components/PostsList";
import { userRoles } from "../store/mutation-types";
export default {
  name: "Posts",
  data: () => {
    return {
      current: 1,
      userRoles
    };
  },
  components: {
    PostsList
  },
  methods: mapActions(["loadPosts"]),
  computed: {
    ...mapState(["posts", "user"]),
    currentRange() {
      return this.posts.slice(
        (this.current - 1) * 10,
        (this.current - 1) * 10 + 10
      );
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.loadPosts());
  }
};
</script>
<style scoped>
.posts-main {
  max-width: 768px;
  display: flex;
  flex-direction: column;
}
</style>
