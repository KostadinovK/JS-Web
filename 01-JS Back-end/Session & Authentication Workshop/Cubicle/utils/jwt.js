const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const jwt = require('jsonwebtoken');

function create(data) {
    return jwt.sign({ data }, config.secret, { expiresIn: config.jwtExpiringTime });
}

function verify(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, (err, data) => {
            if (err) { reject(err); return; }
            resolve(data);
        });
    });
}

module.exports = {
    create,
    verify
}