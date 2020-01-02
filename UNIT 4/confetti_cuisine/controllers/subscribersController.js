const Subscriber = require('../models/subscriber'),
    getSubscriberParams = (body) => {
        return {
            name: body.name,
            email: body.email,
            zipCode: parseInt(body.zipCode)
        };
    }
module.exports = {
    index: (req, res, next) => {
        Subscriber.find({})
            .then(subscribers => {
                res.locals.subscribers = subscribers;
                next();
            })
            .catch(error => {
                console.log(`Error while loading subscribers: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("subscribers/index");
    },
    new: (req, res) => {
        res.render("subscribers/new");
    },
    create: (req, res, next) => {
        let subscriberParams = getSubscriberParams(req.body);
        Subscriber.create(subscriberParams)
            .then(subscriber => {
                res.locals.redirect = "/subscribers";
                res.locals.subscriber = subscriber;
                next();
            })
            .catch(error => {
                console.log(`Error while saving user: ${error.message}`);
                next(error);
            })
    },
    redirectView: (req, res, next) => {
        if (res.locals.redirect)
            res.redirect(res.locals.redirect);
        else next();
    },
    show: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
            .then(subscriber => {
                res.locals.subscriber = subscriber;
                console.log(subscriber);
                next();
            })
            .catch(error => {
                console.log(`Error while fetching subscriber by Id: ${error.message}`);
                next(error);
            })
    },
    showView: (req, res) => {
        res.render('subscribers/show');
    },
    edit: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
            .then(subscriber => {
                res.locals.subscriber = subscriber;
                res.render('subscribers/edit');
            })
            .catch(error => {
                console.log(`Error while rendering edit view : ${error.message}`);
                next(error);
            })
    },
    update: (req, res, next) => {
        let subscriberId = req.params.id,
            subscriberParams = getSubscriberParams(req.body);
        Subscriber.findByIdAndUpdate(subscriberId, {
            $set: subscriberParams
        })
            .then(subscriber => {
                res.locals.redirect = `/subscribers/${subscriber._id}`;
                res.locals.subscriber = subscriber;
                next();
            })
            .catch(error => {
                console.log(`Error updating subscriber's info: ${error.message}`);
                next(error);
            })
    },
    delete: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findByIdAndRemove(subscriberId)
            .then(() => {
                res.locals.redirect = '/subscribers';
                next();
            })
            .catch(error => {
                console.log(`Error deleting subscriber: ${error.message}`);
                next(error);
            })
    }
}
