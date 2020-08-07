const db = require('./connection');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

module.exports = {
    getAllUsers,
    schema,
    users,
}
