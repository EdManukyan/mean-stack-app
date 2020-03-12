const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var userController = require('./controllers/userController');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port - ${PORT}`);
});

app.use('/users', userController);