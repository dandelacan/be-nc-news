const articlesRouter = require('express').Router();
const { getArticles, getArticle, changeVotes } = require('../controllers/articles.controllers');
const { postComment, getComments } = require('../controllers/comments.conrollers');
const { send405 } = require('../errors');

articlesRouter.route('/')
    .get(getArticles)
    .all(send405)

articlesRouter.route('/:article_id')
    .get(getArticle)
    .patch(changeVotes)
    .all(send405)

articlesRouter.route('/:article_id/comments')
    .post(postComment)
    .get(getComments)
    .all(send405)

module.exports = articlesRouter