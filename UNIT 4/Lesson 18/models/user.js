const mongoose = require('mongoose'),
    { Schema } = mongoose;
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
module.exports = mongoose.model("User", userSchema);