const jsonServer = require("json-server");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "data/db.json"));
const middlewares = jsonServer.defaults({ bodyParser: true });

server.use(middlewares);
server.use(cookieParser());

server.post("/signin", (req, res, next) => {
  signIn(req, res, next);
});

server.post("/signout", (req, res, next) => {
  signOut(req, res, next);
});

server.all("/users", (req, res, next) => {
  if (req.method === "GET" && req.query.self) {
    loadUser(req, res, next);
  } else res.sendStatus(403); // restrict any non-GET requests to the list of users
});
// eslint-disable-next-line
server.all("/users/*", (_, res, __) => {
  res.sendStatus(403); // restrict any request to a specific user object
});

server.all("/posts", (req, res, next) => {
  const { method } = req;
  if (method === "GET") {
    next();
  } else if (method === "POST") {
    createPost(req, res, next);
  } else res.sendStatus(403); // restrict any non-POST/GET requests to the list of posts
});

server.all("/posts/:id", (req, res, next) => {
  const { method, body } = req;
  if (method === "PUT") {
    if (body.clap) {
      clapPost(req, res, next);
    } else if (body.edit) {
      updatePost(req, res, next);
    }
    // clapPost or updatePost
  } else if (method === "DELETE") {
    deletePost(req, res, next);
  } else if (method === "GET") {
    next();
  } else res.sendStatus(403); // restrict any non-PUT/DELETE requests to the list of posts
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

const db = () => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "data/db.json")));
};

const findUser = (login, password) => {
  const data = db();

  const foundUser = data.users.find(
    user => user.login === login && user.password.toString() === password
  );
  return foundUser;
};

const findPost = id => {
  const data = db();
  const foundPost = data.posts.find(post => post.id.toString() === id);
  return foundPost;
};

const isAuthorized = req => {
  const { login, password } = req.cookies;
  const user = findUser(login, password);
  return user;
};

// eslint-disable-next-line
const signIn = (req, res, _) => {
  // find user with this login and password
  const {
    body: { login, password }
  } = req;
  const user = findUser(login, password);

  // if found, set cookies, send user data without login and password
  if (user) {
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true
    };
    res.cookie("login", user.login, options);
    res.cookie("password", user.password, options);
    delete user.login;
    delete user.password;
    res.json(user);
  } else res.sendStatus(404);
};

// eslint-disable-next-line
const signOut = (_, res, __) => {
  res.clearCookie("login");
  res.clearCookie("password");
  res.sendStatus(200);
};

// eslint-disable-next-line
const loadUser = (req, res, _) => {
  const user = isAuthorized(req);

  if (user) {
    delete user.login;
    delete user.password;
    res.json(user);
  } else res.sendStatus(403);
};

const clapPost = (req, res, next) => {
  const user = isAuthorized(req);
  const post = findPost(req.params.id);
  if (!user) res.sendStatus(403);
  else if (!post) res.sendStatus(404);
  else if (post.userId === user.id) res.sendStatus(403);
  else {
    req.body = {
      ...post,
      claps: post.claps + 1
    };
    next();
  }
};

const updatePost = (req, res, next) => {
  const user = isAuthorized(req);
  const post = findPost(req.params.id);
  if (!user) res.sendStatus(403);
  else if (!post) res.sendStatus(404);
  else if (post.userId !== user.id) res.sendStatus(403);
  else {
    const { title, description } = req.body;

    req.body = {
      ...post,
      title,
      description,
      updateAt: new Date().toISOString()
    };
    next();
  }
};

const createPost = (req, res, next) => {
  const user = isAuthorized(req);

  if (user && user.role === "writer") {
    const { title, description } = req.body;

    req.body = {
      title,
      description,
      userId: user.id,
      claps: 0,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString()
    };
    next();
  } else res.sendStatus(403);
};

const deletePost = (req, res, next) => {
  const user = isAuthorized(req);
  const post = findPost(req.params.id);

  if (!user) res.sendStatus(403);
  else if (!post) res.sendStatus(404);
  else if (post.userId !== user.id) res.sendStatus(403);
  else {
    next();
  }
};
