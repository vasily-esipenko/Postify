const router = require('express').Router();
const bcrypt = require('bcrypt');
const users = require('../db/User');

router.get('/', (req, res) => {
    users.getAllUsers().then(users => {
        res.json(users);
    });
});

router.post('/register', (req, res, next) => {
    const result = users.schema.validate(req.body);
    if (result.error == null) {
        users.users.findOne({
            username: req.body.username
        }).then(user => {
            if (user) {
                const error = new Error('User already exists');
                next(error);
            } else {
                users.insertUser(req.body).then(user => {
                    res.json(user);
                }).catch(error => {
                    res.status(500);
                    res.json(error);
                });
            }
        });
    } else {
        next(result.error);
    }
});

router.get('/login', (req, res, next) =>{
    const result = schema.validate(req.body);
    if (result.error == null) {
        users.users.findOne({
            username: req.body.username
        }).then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, res) => {
                    if (err) {
                        next(err);
                    }
                    if (res) {
                        //JWT token
                        next(res);
                    }
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
