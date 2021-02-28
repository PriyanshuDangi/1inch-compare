const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    hash: String,
    dex: String,
    tokenIn: {
        symbol: String,
        amount: String,
        image: String,
    },
    tokenOut: {
        symbol: String,
        amount: String,
        image: String
    },
    saved: String,
    tweetLink: String
}, {
    timestamps: true
});

const Schema = mongoose.model('schema', schema);

module.exports = Schema;