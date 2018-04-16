const express = requre('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
require('dotenv').congig()

app.use(cors({ exposedHeaders: 'Auth' }))
app.disable('x-powered-by')
app.use(moregan('dev'))
app.use(bodyParser.json())

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