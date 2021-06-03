const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const router = express.Router();

function getPosts(id) {
  return new Promise(function (resolve, reject) {
    fs.readFile("./posts.json", { encoding: "utf-8" }, function (err, data) {
      if (err) {
        reject(err);
      }

      const allPosts = data ? JSON.parse(data) : [];

      if (id == undefined) {
        resolve(allPosts);
        return;
      }

      const requiredPosts = allPosts.filter(function (post) {
        return post.userId == id;
      });
      resolve(requiredPosts);
    });
  });
}

function writePost(dataToWrite) {
  return new Promise(function (resolve, reject) {
    const data = JSON.stringify(dataToWrite);

    fs.writeFile("./posts.json", data, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Successful");
      }
    });
  });
}

function encrypt(req, res, next) {
  const { password } = req.body;

  if (password == undefined) {
    res.status(403).send("Password is not defined");
    return;
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      throw err;
    } else {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          throw err;
        } else {
          req.body.hash = hash;
          next();
        }
      });
    }
  });
}

router.post("/user", encrypt, function (req, res) {
  const { name, hash } = req.body;

  fs.readFile("./userData.json", { encoding: "utf-8" }, function (err, data) {
    if (err) {
      throw err;
    } else {
      const userList = data ? JSON.parse(data) : [];
      userList.push({ name, password: hash });

      const jsonString = JSON.stringify(userList);

      fs.writeFile("./userData.json", jsonString, function (err) {
        if (err) {
          throw err;
        }
        res.send("Successful");
      });
    }
  });
});

router.get("/posts", async function (req, res) {
  const posts = await getPosts();
  if (posts.length == 0) {
    res.status(404).send("Requested post not found");
    return;
  }
  res.send(posts);
});

router
  .route("/posts/:id")
  .get(async function (req, res) {
    const post = await getPosts(req.params.id);

    if (post.length == 0) {
      res.status(404).send("Requested post not found");
      return;
    }

    res.send(post);
  })
  .post(async function (req, res) {
    const id = req.params.id;
    const oldPosts = await getPosts();

    const dataToAdd = { userId: +id, ...req.body };
    oldPosts.push(dataToAdd);
    await writePost(oldPosts);

    res.send(dataToAdd);
  })
  .patch(async function (req, res) {
    const id = req.params.id;
    const modifiedContent = req.body.content;
    const oldPosts = await getPosts();

    oldPosts.forEach((post, index) => {
      if (post.userId == id) {
        oldPosts[index].content = modifiedContent;
      }
    });

    await writePost(oldPosts);

    res.send({ id, modifiedContent });
  })
  .delete(async function (req, res) {
    const id = req.params.id;
    const oldPosts = await getPosts();

    const newPost = oldPosts.filter((post) => {
      return post.userId != id;
    });

    await writePost(newPost);

    res.send("Deleted");
  });

module.exports = router;
