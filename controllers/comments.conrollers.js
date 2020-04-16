const { insertComment, selectComments, updateVotes, deleteComment }=require('../models/comments.models')

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

exports.changeVotes = (req, res, next) => {
    updateVotes(req.body.inc_votes, req.params).then(([comment]) => {
        res.status(200).send({comment})
    }).catch(next)

}

exports.removeComment = (req, res, next) => {
    deleteComment(req.params).then(() => {
        res.sendStatus(204)
    }).catch(next)
}