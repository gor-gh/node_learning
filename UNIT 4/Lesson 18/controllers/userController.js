const User = require('../models/user');
module.exports = {
    index: (req, res, next) => {
        User.find({})
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(err => {
                console.log(err.message);
                next(err);
            })
    },
    indexView: (req, res) => {
        res.render('users/index');
    }
}