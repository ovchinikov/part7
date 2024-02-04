const express = require('express')
const path = require('path')

const app = express()
const cors = require('cors')
const { unKnownEndpoint, errorHandler } = require('./middleware/errorhandler')

app.use(cors())
require('express-async-errors')

app.use(express.json())
app.use(express.static('dist'))

app.use('/api/blogs', require('./controllers/blog'))
app.use('/api/users', require('./controllers/user'))
app.use('/api/login', require('./controllers/login'))

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
app.use('/api', unKnownEndpoint)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.use(errorHandler)

module.exports = app
