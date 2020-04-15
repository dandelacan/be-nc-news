const express = require('express')
const apiRouter = require('./routes/api.router')
const{handlePSQLErrors, handleCustoms, handle500s, handleInvalidPaths} = require('./errors/index')

const app = express()

app.use(express.json())

app.use('/api', apiRouter)

app.use(handlePSQLErrors)
app.use(handleCustoms)
app.all('/*', handleInvalidPaths)
app.use(handle500s)

module.exports = app