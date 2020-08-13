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
                const error = new Error('User with this username already exists');
                res.json({message: error.message});
            } else {
                bcrypt.hash(req.body.password, 11).then(hashed => {
                    const newUser = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hashed,
                        created: new Date()
                    }
                    users.users.insert(newUser).then(insertedUser => {
                        const payload = {
                            _id: insertedUser._id,
                            email: insertedUser.email,
                            username: insertedUser.username
                        };
                        jwt.sign(payload, config.tokenSecret, {
                            expiresIn: '1d'
                        }, (err, token) => {
                            if (err) {
                                res.status(422);
                                res.json(err);
                            } else {
                                res.json({token: token, message: "You have successfully signed in!"});
                            }
                        });
                        }).catch(error => {
                            res.status(500);
                            res.json({message: `Something went wrong: ${error}`});
                    });
                });
            }
        });
    } else {
        next(result.error);
    }
});

router.post('/login', (req, res, next) =>{
    const result = users.loginSchema.validate(req.body);
    if (result.error == null) {
        users.users.findOne({
            email: req.body.email
        }).then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password).then(result => {
                    if (result) {
                        const payload = {
                            _id: user._id,
                            email: user.email,
                            username: user.username
                        };
                        jwt.sign(payload, config.tokenSecret, {
                            expiresIn: '1d'
                        }, (err, token) => {
                            if (err) {
                                res.status(422);
                                res.json(err);
                            } else {
                                res.json({token: token, message: "You have successfully logged in!"});
                            }
                        });
                    } else {
                        res.status(422);
                        res.json({message: "Wrong password"});
                    }
                });
            } else {
                const error = new Error('There is no such user');
                res.json({message: error.message});
            }
        })
    } else {
        next(result.error);
    }
});

module.exports = router;
