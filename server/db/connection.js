const monk = require('monk');
const config = require('config');

const connection = config.get('mongoDb');
const db = monk(connection);

module.exports = db;
