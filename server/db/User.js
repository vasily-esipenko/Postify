const db = require('./connection');
const Joi = require('joi');

// Sign up validation schema
const schema = Joi.object({
    username: Joi.string().max(30).regex(/(^[a-zA-Z0-9_]+$)/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required()
});

// Log in validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required()
});

// Db connection
const users = db.get('users');

function getAllUsers() {
    return users.find();
}

module.exports = {
    getAllUsers,
    schema,
    loginSchema,
    users,
}
