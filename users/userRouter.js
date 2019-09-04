const express = require('express');
const users = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {
  const newUser = req.body
  users.insert(newUser)
    .then(result => {
      if (!newUser.name) {
        res.status(400).json({ message: "Please include a name for the user"})
      } else {
        res.status(201).json(result)
      }
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error creating the user"})
    })
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
  users.get()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving the users"})
    })
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
