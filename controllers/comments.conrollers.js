const { insertComment, selectComments}=require('../models/comments.models')

exports.postComment = (req, res, next) => {
    const { article_id } = req.params
    insertComment(article_id, req.body).then(([comment]) => {
        res.status(201).send({ comment })
    }).catch(next);
}

exports.getComments = (req, res, next) => {
    const { article_id } = req.params
    const queries = req.query
    selectComments(article_id, queries).then(comments => {
        res.status(200).send({ comments })
    }).catch(next);
}