exports.formatDates = articleArr => {
    return articleArr.map(({ created_at, ...rest }) => {
        return { created_at: new Date(created_at), ...rest }
    });
};

    

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
