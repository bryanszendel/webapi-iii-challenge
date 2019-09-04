const express = require('express');
const users = require('./userDb')
const posts = require('../posts/postDb')

const router = express.Router();

router.post('/', (req, res) => {
  const newUser = req.body
  users.insert(newUser)
    .then(result => {
      if (newUser.name) {
        res.status(201).json(result)
      } else {
        res.status(400).json({ message: "Please include a name for the user"})
      }
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error creating the user"})
    })
});

router.post('/:id/posts', validateUserId, (req, res) => {
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

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
  let id = req.params.id
  console.log(id)
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

};

function validatePost(req, res, next) {

};

module.exports = router;
