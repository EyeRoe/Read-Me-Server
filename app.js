const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
require('dotenv').config()

app.use(cors({ exposedHeaders: 'Auth' }))
app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(bodyParser.json())

const knex = require('./connection')

app.post('/login', (req, res, next) => {
  knex('users')
    .where('name', req.body.name)
    .first()
    .then(user => {
      res.json({user})
    })
    .catch(err => {
      next(err)
    })
})

app.post('/signup', (req, res, next) => {
  console.log('hi')
  knex('users')
    .insert({
      name: req.body.name,
      password: req.body.password
    })
    .returning('*')
    .then(result => {
      res.json(result[0])
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})

app.get('/users/:id/readinglist', (req, res, next) => {
  debugger
  knex('readinglist')
    .where('users_id', req.params.id)
    .then(readingList => {
      res.json(readingList)
    })
    .catch(err => {
      console.log(err)
      res.json({err})
    })
})

app.post('/readinglist', (req, res, next) => {
  console.log(req.body)
  knex('readinglist')
    .insert(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})


app.use((req, res) => {
  const status = 404;
  const message = `Could not ${req.method} ${req.path}`;
  res.status(status).json({ status, message });
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || "Internal Error. Server Hecked Up"
  res.status(status).json({ message })
})


app.listen(port, () => console.log(`On port: ${port}`))

module.exports = app
