const db = require('./connection');
const Joi = require('joi');
const bcrypt = require('bcrypt');

// Validation schema
const schema = Joi.object({
    username: Joi.string().max(30).alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required()
});

const users = db.get('users');

function getAllUsers() {
    return users.find();
}

function insertUser(user) {
    user.created = new Date();
    bcrypt.hash(user.password, 11).then(hashed => {
        user.password = hashed;
    });
    return users.insert(user);
}

module.exports = {
    getAllUsers,
    insertUser,
    schema,
}
