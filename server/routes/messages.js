const express = require('express');
const router = express.Router();
const messages = require('../db/Message');

router.get('/get', (req, res) => {
    messages.getAll().then(messages => {
        res.json(messages);
    });
});

router.post('/insert', (req, res) => {
    messages.insertMsg(req.body).then(message => {
        res.json(message);
    }).catch(error => {
        res.status(500);
        res.json(error);
    });
});

module.exports = router;
