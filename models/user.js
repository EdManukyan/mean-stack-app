const mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: String,
    position: String,
    country: String,
    age: Number,
});

module.exports = { User };