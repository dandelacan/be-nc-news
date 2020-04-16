const articlesRouter = require('express').Router();
const { getArticles, getArticle, changeVotes } = require('../controllers/articles.controllers');
const { postComment, getComments } = require('../controllers/comments.conrollers');

articlesRouter.route('/')
    .get(getArticles)

articlesRouter.route('/:article_id')
    .get(getArticle)
    .patch(changeVotes)

articlesRouter.route('/:article_id/comments')
    .post(postComment)
    .get(getComments)

module.exports = articlesRouter