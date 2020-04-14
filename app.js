const express = require('express')
const apiRouter = require('./routes/api.router')
const{handle500s, handleInvalidPaths} = require('./errors/index')

const app = express()
app.use('/api', apiRouter)
app.all('/*',handleInvalidPaths)
app.use(handle500s)

module.exports = app