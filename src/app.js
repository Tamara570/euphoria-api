require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('../config')
const { CLIENT_ORIGIN } = require('../config')
const errorHandler = require('../middleware/error-handler')
const blogRouter = require('./blog/blog-router')
// const authRouter = require('./auth/auth-router')

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
app.use("/api/blog", blogRouter);
// app.use(authRouter)


app.use(errorHandler)

module.exports = app