const mongoose = require('mongoose'),
    { Schema } = mongoose,
    Subscriber = require('./subscriber');

userSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    zipCode: {
        type: Number,
        min: [10000, "Zip code is too short"],
        max: 99999
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" }
}, {
    timestamps: true
});
userSchema.virtual("fullName")
    .get(function () {
        return `${this.name.first} ${this.name.last}`
    });
userSchema.pre("save", function (next) {
    let user = this;
    if (user.subscribedAccount === undefined) {
        Subscriber.findOne({
            email: user.email
        })
            .then(subscriber => {
                user.subscribedAccount = subscriber;
                next();
            })
            .catch(err => {
                console.log(`Error while connecting subscriber ${err.message}`);
                next(err);
            })
    }
    else {
        next();
    }
})
module.exports = mongoose.model("User", userSchema);