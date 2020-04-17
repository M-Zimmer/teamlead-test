import config from "../config";
/* eslint-disable no-console */
const defaultParams = {
  method: "GET",
  path: ""
};

// generic request, accepts a method string and a body object
export const request = params => {
  params = { ...defaultParams, ...params };
  const { body, path, method } = params;
  const options = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (method !== "GET") {
    options.body = JSON.stringify(body);
  }

  return fetch(config.dbHost + path, options);
};

export const signIn = (login, password) => {
  return request({
    method: "POST",
    path: "signin",
    body: { login, password }
  });
};

export const signOut = () => {
  return request({ method: "POST", path: "signout" });
};

export const loadUser = () => {
  return request({ path: "users?self=true" });
};

export const loadPosts = () => {
  return request({ path: "posts" });
};

export const clapPost = id => {
  return request({
    method: "PUT",
    path: `posts/${id}`,
    body: {
      clap: true
    }
  });
};

export const createPost = options => {
  const { title = "", description = "" } = options;
  return request({
    method: "POST",
    path: "posts",
    body: {
      title,
      description
    }
  });
};

export const updatePost = (id, options) => {
  const { title, description } = options;
  return request({
    method: "PUT",
    path: `posts/${id}`,
    body: {
      edit: true,
      title,
      description
    }
  });
};

export const deletePost = id => {
  return request({
    method: "DELETE",
    path: `posts/${id}`
  });
};
