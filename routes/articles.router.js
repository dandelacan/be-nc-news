const articlesRouter = require('express').Router();
const { getArticle, changeVotes } = require('../controllers/articles.controllers');
const { postComment, getComments } = require('../controllers/comments.conrollers');

articlesRouter.route('/:article_id')
    .get(getArticle)
    .patch(changeVotes)

articlesRouter.route('/:article_id/comments')
    .post(postComment)
    .get(getComments)

module.exports = articlesRouter