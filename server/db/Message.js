const db = require('./connection');
const Joi = require('joi');

// Validation schema
const schema = Joi.object({
    username: Joi.string().max(30).alphanum().required(),
    subject: Joi.string().max(80).required(),
    message: Joi.string().max(500).required(),
    imageUrl: Joi.string().uri({
        scheme: [
            /https?/
        ]
    })
});

// Connect messages collection
const messages = db.get('messages');

// Get all the messages from collection
function getAll() {
    return messages.find();
}

// Post message to the messages collection 
function insertMsg(message) {
    if (!message.username) {
        message.username = "Anonymous";
    }
    const result = schema.validate(message);
    if (result.error == null) {
        message.created = new Date();
        return messages.insert(message);
    } else {
        result ;Promise.reject(result.error);
    }
}

module.exports = {
    getAll,
    insertMsg
};
