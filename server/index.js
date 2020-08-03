const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const morgan = require('morgan');

const messages = require('./db/Message');

const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: 'Server is working!'
    });
});

app.get('/messages', (req, res) => {
    messages.getAll().then(messages => {
        res.json(messages);
    });
});

app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.insertMsg(req.body).then(message => {
        res.json(message);
    }).catch(error => {
        res.status(500);
        res.json(error);
    });
});

const PORT = config.get('port') || 7000;

app.listen(PORT, () => {
    console.log(`Server is on post ${PORT}`);
});
