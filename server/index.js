const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const authRoute = require('./routes/auth');
const messageRoute = require('./routes/messages');

//Import middlewares
const authMiddleware = require('./middlewares/middleware');

// App initialization
const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors({
    origin: 'http://localhost:8080'
}));
app.use(express.json());
app.use(authMiddleware.checkTokenSetUser);


app.use('/api/user', authRoute);
app.use('/api/messages', messageRoute);

// Check server work
app.get('/', (req, res) => {
    res.json({
        message: 'Server is working!'
    });
});

// Port connection
const PORT = config.get('port') || 7000;

// Running app
app.listen(PORT, () => {
    console.log(`Server is on post ${PORT}`);
});
