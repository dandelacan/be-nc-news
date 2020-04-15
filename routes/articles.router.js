const articlesRouter = require('express').Router();
const { getArticle, changeVotes } = require('../controllers/articles.controllers');

articlesRouter.route('/:article_id')
    .get(getArticle)
    .patch(changeVotes)

module.exports = articlesRouter