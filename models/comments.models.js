const connection = require('../db/connection')

exports.insertComment = (article_id, { username, body }) => {
    return connection('comments')
        .insert({ article_id, author: username, body })
        .returning('*')
};

exports.selectComments = (article_id, { sort_by = 'created_at', order = 'desc' }) => {
    if (!['asc', 'desc'].includes(order)) {
        return Promise.reject({ status: 400, msg: "order query must be asc or desc" })
    }
    return connection('comments')
        .select('comment_id', 'votes', 'created_at', 'author', 'body')
        .where({ article_id })
        .orderBy(sort_by, order)
        .then(comments => {
            if (comments.length === 0) return Promise.reject({ status: 404, msg: 'no comments found' })
            return comments
        })
}