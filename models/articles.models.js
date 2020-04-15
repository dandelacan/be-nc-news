const connection = require('../db/connection')

exports.selectArticle = ( article_id ) => {
    
    return connection('articles')
        .select('articles.author', 'title', 'articles.article_id', 'articles.body', 'topic', 'articles.created_at', 'articles.votes')
        .count('comment_id as comment_count')
        .leftJoin('comments', 'articles.article_id', 'comments.article_id')
        .groupBy('articles.article_id')
        .where({ 'articles.article_id': article_id })
        .then(article => {
            if (article.length === 0) {
                return Promise.reject({status:404, msg:'invalid article id'})
            }
            return article
        })
}

exports.updateVotes = (inc_vote , {article_id})=> {
    return connection('articles')
        .select('votes')
        .where({ article_id })
        .then(article => {
            if (article.length === 0) return Promise.reject({ status: 404, msg: 'invalid article id' })
            return article
        })
        .then(([{ votes }]) => {
            const newVoteTotal = votes + inc_vote
            return connection('articles')
                .where({ article_id })
                .update({ votes: newVoteTotal })
                .returning('*')
        });
        
}