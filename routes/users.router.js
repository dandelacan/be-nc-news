const usersRouter = require('express').Router()
const {getUser} = require('../controllers/users.conrollers')

usersRouter.route('/:username')
    .get(getUser)

module.exports = usersRouter