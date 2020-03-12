const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB', { useNewUrlParser: true }, (error) => {
    if(!error) {
        console.log('Connection is succedded!!');
    } else {
        console.log('Connection is failed' + JSON.stringify(error, undefined, 2));
    }
})

module.exports = mongoose;