const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require('./users.js')(mongoose);
db.books = require('./books.js')(mongoose);
db.authors = require('./authors.js')(mongoose);

module.exports = db;