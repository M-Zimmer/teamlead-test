<template>
  <div>
    <div class="hero has-text-centered" v-if="!posts.length">
      <div class="hero-body">
        <h1 class="title">
          No posts available.
        </h1>
      </div>
    </div>
    <div class="tile is-vertical" v-if="posts.length">
      <div
        class="tile is-parent card"
        style="margin: 16px 0px; padding: 0"
        v-for="post in posts"
        :key="post.id"
      >
        <div class="tile is-child card-content">
          <div class="content">
            <p class="title">{{ post.title }}</p>
            <p class="subtitle">{{ post.description }}</p>
            <b-field grouped group-multiline style="overflow-x: auto">
              <p
                class="control is-size-7 has-text-grey-light"
                style="padding: 16px 0 0 0"
              >
                {{ new Date(post.createdAt).toDateString() }}
              </p>
              <p class="control" style="margin-left: auto">
                <button
                  class="button has-text-info has-background-grey-lighter"
                  v-if="
                    user.role === userRoles.Reader ||
                      (user.role === userRoles.Writer &&
                        user.id !== post.userId)
                  "
                  @click="clapPost({ id: post.id })"
                >
                  <b-icon icon="hand-left" style="margin: 0 8px 0 0"></b-icon>
                  <span class="title is-6 has-text-info">
                    {{ post.claps }}
                  </span>
                </button>
              </p>
              <p class="control">
                <button
                  class="button has-text-info has-background-grey-lighter"
                  @click="
                    $router.push({
                      name: 'CreateEditPost',
                      query: { edit: true, post }
                    })
                  "
                  v-if="
                    user.role === userRoles.Writer && user.id === post.userId
                  "
                >
                  <b-icon
                    icon="square-edit-outline"
                    style="margin: 0 8px 0 0"
                  ></b-icon>
                  <span class="title is-6 has-text-info">Edit</span>
                </button>
              </p>
              <p class="control">
                <button
                  class="button has-text-info has-background-grey-lighter"
                  @click="deletePost({ id: post.id })"
                  v-if="
                    user.role === userRoles.Writer && user.id === post.userId
                  "
                >
                  <b-icon icon="trash-can" style="margin: 0 8px 0 0"></b-icon>
                  <span class="title is-6 has-text-info">Delete</span>
                </button>
              </p>
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { userRoles } from "../store/mutation-types";
export default {
  name: "PostsList",
  data: () => {
    return {
      userRoles
    };
  },
  props: {
    posts: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: mapState(["user"]),
  methods: {
    ...mapActions(["deletePost", "clapPost"])
  }
};
</script>

<style scoped></style>
