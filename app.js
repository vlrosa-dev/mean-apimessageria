const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Establishing connection mongoDB
const { mongoose } = require('./db/moongose');

// Import models
const { User, Message } = require('./db/models/index')

// Load Middleware
app.use(bodyParser.json());

// CORS Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * POST /users
 * Purpose: Create new user
 */
app.post('/signup', (req, res) => {

    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save().then((listUser) => {
        res.send(listUser);
    });
});

/**
 * GET /users/:userId/messages
 * Purpose: get all messages in specific user
 */
app.get('/users/:userId/messages', (req, res) => {
    Message.find({
        _userId: req.params.userId
    }).then((messages) => {
        res.send(messages);
    });
});

/**
 * POST /users/:userId/messages
 * Purpose: create new message in specific user
 */
app.post('/users/:userId/messages', (req, res) => {

    let newMessage = new Message({
        title: req.body.title,
        _userId: req.params.userId
    });

    newMessage.save().then((message) => {
        res.send(message);
    })
})

/**
 * PATCH /users/:userId/messages/:messageId
 * Purpose: update message in specific user
 */
app.patch('/users/:userId/messages/:messageId', (req, res) => {
    Message.findOneAndUpdate({
        _id: req.params.messageId,
        _userId: req.params.userId
    }, {
        $set: req.body
    }).then(() => {
        res.send({message: "Atualizado com sucesso!"})
    });
});

/**
 * DELETE /users/:userId/messages/:messageId
 * Purpose: delete message in specific user
 */
app.delete('/users/:userId/messages/:messageId', (req, res) => {
    Message.findOneAndDelete({
        _id: req.params.messageId,
        _userId: req.params.userId
    }).then((messageRemoved) => {
        res.send(messageRemoved);
    });
});

// Listen Port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000.");
});