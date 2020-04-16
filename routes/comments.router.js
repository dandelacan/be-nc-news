const commentsRouter = require('express').Router();
const { changeVotes, removeComment } = require('../controllers/comments.conrollers');
const { send405 } = require('../errors');

commentsRouter.route('/:comment_id')
    .patch(changeVotes)
    .delete(removeComment)
    .all(send405)

module.exports = commentsRouter