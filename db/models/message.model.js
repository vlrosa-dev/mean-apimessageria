const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Message = mongoose.model('Message', MessagesSchema);

module.exports = {
    Message
}