exports.send405 = (req, res, next) => {
    res.status(405).send({ msg: 'method not allowed' })
};
exports.handlePSQLErrors = (err, req, res, next) => {
    const codes = {
        '42703': { status: 400, msg: 'invalid key/s' },
        '23503': { status: 422, msg: 'resource does not exist' },
        '22P02': { status: 400, msg: 'missing key/s' },
        '23502': { status: 400, msg: 'body has wrong keys' }
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

