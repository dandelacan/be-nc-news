const {selectUser}= require('../models/users.models')

exports.getUser = (req, res, next) => {
    const username = req.params.username
    selectUser(username).then(([user]) => {
        res.status(200).send({user})
    }).catch(next)

}