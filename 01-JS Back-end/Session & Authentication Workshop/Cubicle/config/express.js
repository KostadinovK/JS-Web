const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

module.exports = (app) => {
    
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static('static'));

    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: false }))
    app.set('views', 'views');
};