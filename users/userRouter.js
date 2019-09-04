const express = require('express');
const users = require('./userDb')
const posts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  users.insert(req.body)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error creating the user"})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  let newPost = req.body
  console.log(newPost)
  console.log(req.user.id)
  posts.insert(newPost)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => {
      res.status(500).json({ error: "Error saving the user post." })
    })
});

router.get('/', (req, res) => {
  users.get()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving the users" })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  users.getById(req.user.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving this user." })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  users.getUserPosts(req.params.id)
    .then(userPosts => {
      res.status(200).json(userPosts)
    })
    .catch(error => {
      res.status(500).json({error: "Error retrieving this user's posts" })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  users.remove(req.params.id)
    .then(deleted => {
      res.status(200).json({ message: "The user has been removed.", deleted })
    })
    .catch(error => {
      res.status(500).json({ error: "Error removing the user."})
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  users.update(req.params.id, req.body)
    .then(updated => {
      res.status(200).json({ message: "The user has been updated.", updated })
    })
    .catch(error => {
      res.status(500).json({ error: "Error updating the user."})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id
  users.getById(id)
    .then(user => {
      if (user.id) {
        req.user = user
        next()
      }
    })
    .catch(error => {
      res.status(400).json({ errorMessage: "invalid user ID"})
      next()
    })
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing user data' })
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' })
  } else {
    next()
  }
};

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing post data' })
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' })
  } else {
    next()
  }
};

module.exports = router;
