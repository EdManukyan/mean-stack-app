const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/user');

// Get All Users
router.get('/', (req, res) => {
    User.find((error, docs) => {
        if (!error) {
            res.send(docs);
        } else {
            console.log('Error occured while connecting to DB' + JSON.stringify(error, undefined, 2));
        }
    });
})

// Get a user by id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No user width given id ${req.params.id} was found`);
    }
    User.findById(req.params.id, (error, docs) => {
        if (!error) {
            res.send(docs);
        } else {
            console.log('User not found' + JSON.stringify(error, undefined, 2));
        }
    })
})

// Create a user
router.post('/', (req, res) => {
    const user = new User({
        name: req.body.name,
        position: req.body.position,
        country: req.body.country,
        age: req.body.age,
    });
    user.save((error, doc) => {
        if (!error) {
            res.send(doc);
        } else {
            console.log('Error occured while sending the data' + JSON.stringify(error, undefined, 2));
        }
    });
});

// Update a user data
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No user width given id ${req.params.id} was found to update`);
    }
    const user = {
        name: req.body.name,
        position: req.body.position,
        country: req.body.country,
        age: req.body.age,
    };
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (error, doc) => {
        if (!error) {
            res.send(doc);
        } else {
            console.log('Error occured while sending the data' + JSON.stringify(error, undefined, 2));
        }
    });
});

// Remove a user data
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No user width given id ${req.params.id} was found to delete`);
    }
    User.findByIdAndRemove(req.params.id, (error, docs) => {
        if (!error) {
            res.send(docs);
        } else {
            console.log('User not found' + JSON.stringify(error, undefined, 2));
        }
    })
});

module.exports = router;