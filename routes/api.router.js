const apiRouter = require('express').Router()
const topicsRouter = require('./topics.router')
const usersRouter = require('./users.router')
const articlesRouter = require('./articles.router')
const commentsRouter = require('./comments.router')
const endpointJSON = require('../endpoints.json')


apiRouter.get('/', (req, res, next) => {
    res.send(endpointJSON)
})

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter