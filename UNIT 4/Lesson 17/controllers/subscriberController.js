const Subscriber = require('../models/subscriber');

exports.getAllSubscribers = (req, res) => {
    Subscriber.find({})
        .exec()
        .then((subscribers) => {
            res.render("subscribers", { subscribers: subscribers });
        })
        .catch((error) => {
            console.error(error);
            return [];
        })
        .then(() => {
            console.log("Promise complete!");
        })
}
exports.getSubscriptonPage = (req, res) => {
    res.render("contact")
}
exports.afterSubscription = (req, res) => {
    res.render("thanks");
}
exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });
    newSubscriber.save()
        .then(() => {
            res.redirect('/subscribe');
        })
        .catch(() => {
            res.send("error");
        })
}