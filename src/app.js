require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('../config')
const { CLIENT_ORIGIN } = require('../config')
const registerRouter = require('./register/register-router')
const authRouter = require('./auth/auth-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
)
app.use(express.json())
app.use(registerRouter)
app.use(authRouter)


app.get('/', (req, res) => {
    res.send('Hello, boilerplate!')
})

/*app.post('/user', (req, res) => {
  const { fullname, username, password } = req.body;

  //missing name
  if (!fullname) {
    return res
      .status(400)
      .send('Full Name Required')
  }

  //missing username
  if (!username) {
    return res
      .status(400)
      .send('Username Required')
  }

  //missing password
  if (!password) {
    return res
      .status(400)
      .send('Password Required')
  }

  //username length
  if (username.length < 6 || username.length > 20) {
    return res
      .status(400)
      .send('Username must be between 6 and 20 characters');
  }
  
  //password length
  if (password.length < 8 || password.length > 36) {
    return res
      .status(400)
      .send('Password must be between 8 and 36 characters');
  }

  res.send('All validation passed')
})
*/



app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app