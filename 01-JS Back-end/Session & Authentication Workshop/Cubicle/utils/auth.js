const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const jwt = require('./jwt');
const userService = require('../services/userService');

function auth() {
    return async function (req, res, next) {
        const token = req.cookies[config.authCookieName] || '';

        let userData = await jwt.verify(token).catch(err => {
            res.redirect('/');
            return;
        });

        req.user = await userService.getByIdAsync(userData.data.id);
        next();
    };
}
  
module.exports = auth;