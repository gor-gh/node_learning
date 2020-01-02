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
    },
    new: (req, res) => {
        res.render('users/new');
    },
    create: (req, res, next) => {
        let userParams = {
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode
        };
        User.create(userParams)
            .then(user => {
                res.locals.redirect = '/users';
                res.locals.user = user;
                next();
            })
            .catch(err => {
                console.log(err.message);
                next(err);
            })
    },
    redirectView: (req, res) => {
        if (res.locals.redirect) res.redirect(res.locals.redirect)
        else next();
    }
}