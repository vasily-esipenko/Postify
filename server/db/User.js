const db = require('./connection');
const Joi = require('joi');

// Validation schema
const schema = Joi.object({
    username: Joi.string().max(30).alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

const users = db.get('users');

function getAllUsers() {
    return users.find();
}

function insertUser(user) {
    const result = schema.validate(user);
    if (result.error == null) {
        user.created = new Date();
        return users.insert(user);
    } else {
        result ;Promise.reject(result.error);
    }
}

module.exports = {
    getAllUsers,
    insertUser
}