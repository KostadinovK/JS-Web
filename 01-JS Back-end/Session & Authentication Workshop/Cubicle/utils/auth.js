const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const jwt = require('./jwt');
const userService = require('../services/userService');

module.exports = function(){
    return function(req, res, next){
        const token = req.cookies[config.authCookieName];
        jwt.verify(token)
            .then(({ id }) => userService.getByIdAsync(id))
            .then(user => {
                if(!user){
                    return Promise.reject();
                }
                req.user = user;
                next();
            })
            .catch(() => {
                res.status(401).send("Unauthorized!You have no access to this page!");
            });
    }
}