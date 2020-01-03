const User = require('../models/user'),
    getUserParams = (body) => {
        return {
            name: {
                first: body.first,
                last: body.last
            },
            email: body.email,
            zipCode: body.zipCode,
            password: body.password
        };
    };

module.exports = {
    index: (req, res, next) => {
        User.find({})
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(err => {
                console.log(`Error loading users: ${err.message}`);
                next(err);
            })
    },
    indexView: (req, res) => {
        res.render("users/index");
    },
    new: (req, res) => {
        res.render("users/new");
    },
    create: (req, res, next) => {
        let userParams = getUserParams(req.body);
        User.create(userParams)
            .then(user => {
                req.flash("success", `${user.fullName}'s account created successfully!'`);
                res.locals.redirect = "/users";
                res.locals.user = user;
                next();
            })
            .catch(err => {
                console.log(`Failed to create user account because: ${err.message}`);
                req.flash("error", `Failed to create user account because: ${err.message}`);
                res.locals.redirect = "/users/new";
                next();
            })
    },
    redirectView: (req, res, next) => {
        if (res.locals.redirect)
            res.redirect(res.locals.redirect);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(err => {
                console.log(`Error loading account: ${err.message}`);
                neext(err);
            })
    },
    showView: (req, res) => {
        res.render("users/show");
    },
    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                res.render("users/edit");
            })
            .catch(err => {
                console.log(`Error editing user: ${err.message}`);
                next(err);
            })
    },
    update: (req, res, next) => {
        let userId = req.params.id,
            userParams = getUserParams(req.body);
        User.findByIdAndUpdate(userId, {
            $set: userParams
        })
            .then(user => {
                res.locals.user = user;
                res.locals.redirect = `/users/${user._id}`;
                console.log("updated")
                next();
            })
            .catch(err => {
                console.log(`error updating user info : ${err.message}`);
                next(err);
            })
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(err => {
                console.log(`error deleting user : ${err.message}`);
                next(err);
            })
    }
}