const { selectArticle, updateVotes } = require('../models/articles.models');

exports.getArticle = (req, res, next) => {
    const article_id = req.params.article_id
    selectArticle(article_id).then(([article]) => {
        res.status(200).send({article})
    }).catch(next)
};

exports.changeVotes = (req, res, next) => {
    updateVotes(req.body.inc_votes, req.params).then(([article]) => {
        res.status(200).send({article})
    }).catch(next)
}