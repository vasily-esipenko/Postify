const router = require('express').Router();
const bcrypt = require('bcrypt');
const users = require('../db/User');

router.get('/', (req, res) => {
    users.getAllUsers().then(users => {
        res.json(users);
    });
});

router.post('/register', (req, res) => {
    const result = users.schema.validate(req.body);
    if (result.error == null) {
        users.insertUser(req.body).then(user => {
            res.json(user);
        }).catch(error => {
            res.status(500);
            res.json(error);
        });
    } else {
        result ;Promise.reject(result.error);
    }
});

router.get('/login', (req, res) =>{
    res.send('Login');
});

module.exports = router;
