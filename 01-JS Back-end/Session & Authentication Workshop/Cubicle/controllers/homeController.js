const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

function about(req, res){
    res.render('about.hbs', {user: req.cookies[config.authCookieName]});
}

function notFound(req, res){
    res.status(404);
    res.render('404.hbs', {user: req.cookies[config.authCookieName]});
}

module.exports = {
    about,
    notFound
}