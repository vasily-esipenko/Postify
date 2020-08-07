const router = require('express').Router();
const bcrypt = require('bcrypt');
const users = require('../db/User');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');

router.get('/', (req, res) => {
    users.getAllUsers().then(users => {
        res.json(users);
    });
});

router.post('/register', (req, res, next) => {
    const result = users.schema.validate(req.body);
    if (result.error == null) {
        users.users.findOne({
            username: req.body.username,
        }).then(user => {
            if (user) {
                const error = new Error('User already exists');
                next(error);
            } else {
                bcrypt.hash(req.body.password, 11).then(hashed => {
                    const newUser = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hashed,
                        created: new Date()
                    }
                    users.users.insert(newUser).then(insertedUser => {
                        res.json(insertedUser).catch(error => {
                            res.status(500);
                            res.json(error);
                        });
                    });
                });
            }
        });
    } else {
        next(result.error);
    }
});

router.post('/login', (req, res, next) =>{
    const result = users.schema.validate(req.body);
    if (result.error == null) {
        users.users.findOne({
            username: req.body.username,
            email: req.body.email
        }).then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password).then(result => {
                    res.json(result);
                });
            } else {
                const error = new Error('There is no such user');
                next(error);
            }
        })
    } else {
        next(result.error);
    }
});

module.exports = router;
