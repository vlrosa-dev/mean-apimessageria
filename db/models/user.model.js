const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    _messageId: {
        type: mongoose.Types.ObjectId,
        ref: 'Message'
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}
