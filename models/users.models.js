const connection = require(('../db/connection'))

exports.selectUser = username => {
    return connection('users')
        .select('*')
        .where('username', '=', username)
        .then(user => {
            if (user.length === 0) {
                return Promise.reject({ status: 404, msg: 'user not found' })
            }
            return (user)
        })
};

