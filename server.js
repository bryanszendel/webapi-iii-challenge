const express = require('express');
const path = require('path')
// const logger = require('morgan')
const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')




const server = express();



server.use(express.json())
server.use(logger)

server.use('/posts', postRouter)
server.use('/users', validateUserId, userRouter)




server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`
  )
  next()
}

function validateUserId(req, res, next) {
  let id = req.params.id
  if (id) {
    res.status(201).json(res)
    req.user = req.body
  } else {
    res.status(400).json({ message: "invalid user id"})
  }
}

module.exports = server;
