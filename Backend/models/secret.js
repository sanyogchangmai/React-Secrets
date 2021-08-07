const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const secretSchema = new Schema({
    user_uid: {
        type: String
    },
    secrets: {
        type: String
    },
}, {timestamps: true});

const Secret = mongoose.model("Secret",secretSchema);

module.exports = Secret;