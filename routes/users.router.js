const usersRouter = require('express').Router()
const { getUser } = require('../controllers/users.conrollers')
const { send405 } = require('../errors/index');

usersRouter.route('/:username')
    .get(getUser)
    .all(send405)

module.exports = usersRouter