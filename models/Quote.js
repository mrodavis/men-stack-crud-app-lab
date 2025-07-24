const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    name: String,
    dailyQuote: String,
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;