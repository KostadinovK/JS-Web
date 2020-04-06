const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const mongoose = require('mongoose');

module.exports = () => {
  return mongoose.connect(config.connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
};