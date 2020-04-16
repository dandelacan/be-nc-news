const connection = require("../db/connection");

exports.selectArticles = ({ sort_by = 'created_at', order = 'desc', author, topic }, article_id) => {
    if (!['asc', 'desc'].includes(order)) {
        return Promise.reject({ status: 400, msg: "order query must be asc or desc" })
    }
    return connection("articles")
        .select(
            "articles.author",
            "title",
            "articles.article_id",
            "articles.body",
            "topic",
            "articles.created_at",
            "articles.votes"
        )
        .count("comment_id as comment_count")
        .leftJoin("comments", "articles.article_id", "comments.article_id")
        .groupBy("articles.article_id")
        .orderBy(sort_by, order)
        .modify((query) => {
            if (article_id) {
                query.where({ "articles.article_id": article_id })
            };
        })
        .modify((query) => {
            if (author) {
                query.where({ "articles.author": author })
            }
        })
        .modify((query) => {
            if (topic) {
                query.where({ "articles.topic": topic })
            }
        })
        .then((article) => {
            if (article.length === 0) {
                return Promise.reject({ status: 404, msg: "no articles found" });
            }
            return article;
        });
};

exports.updateVotes = (inc_vote, { article_id }) => {
  return connection("articles")
    .select("votes")
    .where({ article_id })
    .then((article) => {
      if (article.length === 0)
        return Promise.reject({ status: 404, msg: "invalid article id" });
      return article;
    })
    .then(([{ votes }]) => {
      const newVoteTotal = votes + inc_vote;
      return connection("articles")
        .where({ article_id })
        .update({ votes: newVoteTotal })
        .returning("*");
    });
};
