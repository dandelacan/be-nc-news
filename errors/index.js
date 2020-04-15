exports.send405 = (req, res, next) => {
    res.status(405).send({ msg: 'method not allowed' })
};
exports.handlePSQLErrors = (err, req, res, next) => {
    const codes = {
        '22P02': { status: 400, msg: 'missing key/s' }
    };

    if (err.code in codes) {
        const { msg, status } = codes[err.code]
        res.status(status).send({ msg });
    }else next(err)
}

exports.handleCustoms = (err, req, res, next) => {
    if (err.status) res.status(err.status).send({ msg: err.msg });
    else next(err)
};

exports.handle500s = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({ msg: 'server error' })
};

exports.handleInvalidPaths = (req, res, next) => {
    res.status(404).send({ msg: 'path not found' })
};

