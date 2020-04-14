

exports.handle500s = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg:'server error'})
}

exports.handleInvalidPaths = (req, res, next) => {
    res.status(404).send({msg: 'path not found'})
}