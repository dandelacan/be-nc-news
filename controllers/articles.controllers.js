const { selectArticles, selectArticle, updateVotes } = require('../models/articles.models');

exports.getArticles = (req, res, next) => {
    queries = req.query
    selectArticles(queries).then(articles => {
        res.send({articles})
    }).catch(next)
}
    
    
exports.getArticle = (req, res, next) => {
    const article_id = req.params.article_id
    selectArticles({}, article_id).then(([article]) => {
        res.status(200).send({article})
    }).catch(next)
};

exports.changeVotes = (req, res, next) => {
    updateVotes(req.body.inc_votes, req.params).then(([article]) => {
        res.status(200).send({article})
    }).catch(next)
}