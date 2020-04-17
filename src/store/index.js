import Vue from "vue";
import Vuex from "vuex";
import {
  signIn,
  signOut,
  loadUser,
  loadPosts,
  clapPost,
  createPost,
  updatePost,
  deletePost
} from "../api/request";
import {
  SET_USER,
  CLEAR_USER,
  SET_POSTS,
  CLEAR_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  userRoles
} from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: -1,
      role: userRoles.Guest
    },
    posts: []
  },
  mutations: {
    [SET_USER](state, user) {
      state.user = user;
    },
    [CLEAR_USER](state) {
      state.user = {
        id: -1,
        role: userRoles.Guest
      };
    },
    [SET_POSTS](state, posts) {
      state.posts = posts;
    },
    [CLEAR_POSTS](state) {
      state.posts = [];
    },
    [CREATE_POST](state, post) {
      state.posts = [...state.posts, post];
    },
    [UPDATE_POST](state, post) {
      const foundPost = state.posts.find(current => current.id === post.id);
      if (foundPost) {
        Object.keys(post).forEach(key => {
          foundPost[key] = post[key];
        });
        state.posts = [...state.posts];
      }
    },
    [DELETE_POST](state, id) {
      state.posts = state.posts.filter(post => post.id !== id);
    }
  },
  actions: {
    async signIn({ commit }, { login, password }) {
      const result = await signIn(login, password);
      if (result.ok) {
        const user = await result.json();
        localStorage.setItem("credentialsSaved", "true");
        commit(SET_USER, user);
      }
    },
    async signOut({ commit }) {
      const result = await signOut();
      if (result.ok) {
        localStorage.removeItem("credentialsSaved");
        commit(CLEAR_USER);
      }
    },
    async loadUser({ commit }) {
      const result = await loadUser();
      if (result.ok) {
        const user = await result.json();
        commit(SET_USER, user);
      }
    },
    async loadPosts({ commit }) {
      const result = await loadPosts();
      if (result.ok) {
        const posts = await result.json();
        commit(SET_POSTS, posts);
      }
    },
    async clapPost({ commit }, { id }) {
      const result = await clapPost(id);
      if (result.ok) {
        const updatedPost = await result.json();
        commit(UPDATE_POST, updatedPost);
      }
    },
    async createPost({ commit }, { options }) {
      const result = await createPost(options);
      if (result.ok) {
        const createdPost = await result.json();
        commit(CREATE_POST, createdPost);
      }
    },
    async updatePost({ commit }, { id, options }) {
      const result = await updatePost(id, options);
      if (result.ok) {
        const updatedPost = await result.json();
        commit(UPDATE_POST, updatedPost);
      }
    },
    async deletePost({ commit }, { id }) {
      const result = await deletePost(id);
      if (result.ok) {
        commit(DELETE_POST, id);
      }
    }
  },
  modules: {}
});
