const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const authRoute = require('./routes/auth');

// Add messages collection from the database
const messages = require('./db/Message');
const users = require('./db/User');

// App initialization
const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

app.use('/api/user', authRoute);

// Check server work
app.get('/', (req, res) => {
    res.json({
        message: 'Server is working!'
    });
});

// Get all messages
app.get('/messages', (req, res) => {
    messages.getAll().then(messages => {
        res.json(messages);
    });
});

// Post message to the messages' collection
app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.insertMsg(req.body).then(message => {
        res.json(message);
    }).catch(error => {
        res.status(500);
        res.json(error);
    });
});

// Get all users
app.get('/api/user', (req, res) => {
    users.getAllUsers().then(users => {
        res.json(users);
    });
});

// Post user to the users collection
app.post('/api/user', (req, res) => {
    users.insertUser(req.body).then(user => {
        res.json(user);
    }).catch(error => {
        res.status(500);
        res.json(error);
    });
});

// Port connection
const PORT = config.get('port') || 7000;

// Running app
app.listen(PORT, () => {
    console.log(`Server is on post ${PORT}`);
});
