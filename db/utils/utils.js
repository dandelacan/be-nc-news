exports.formatDates = articleArr => {
    return articleArr.map(({ created_at, ...rest }) => {
        return { created_at: new Date(created_at), ...rest }
    });
};

    

exports.makeRefObj = list => {
    if (list.length === 0) return {}
    const refObj = {}
    list.forEach(article => {
        refObj[article.title] = article.article_id
    })
    return refObj
};

exports.formatComments = (comments, articleRef) => {
    return comments.map(({ created_by, belongs_to, created_at, ...restOfComment }) => {
        return {
            author: created_by,
            article_id: articleRef[belongs_to],
            created_at: new Date(created_at),
            ...restOfComment
        }
    })
};
