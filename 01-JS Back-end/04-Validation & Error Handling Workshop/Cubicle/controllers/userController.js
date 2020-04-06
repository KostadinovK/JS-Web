const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const userService = require('../services/userService');

function loginGet(req, res){
    res.render('login.hbs', {user: req.cookies[config.authCookieName]});
}

async function loginPost(req, res){
    const { username, password } = req.body;

    let userFromDb = await userService.getByUsernameAsync(username).catch(err => console.log(err));

    if(userFromDb === null || !userFromDb.matchPassword(password)){
        res.redirect('/login');
        return;
    }

    let jwt = userService.login(userFromDb.id);

    res.cookie(config.authCookieName, jwt);
    res.redirect('/');
}

function registerGet(req, res){
    res.render('register.hbs', {user: req.cookies[config.authCookieName]});
}

async function registerPost(req, res){
    const { username, password, repeatPassword} = req.body;

    const validateUsernameAndPassRegex = new RegExp('^[a-zA-Z0-9]*$');

    if(username === null || username.length < 5 || !validateUsernameAndPassRegex.test(username)){
        res.redirect('/register');
        return;
    }

    if(password === null || password.length < 8 || !validateUsernameAndPassRegex.test(password)){
        res.redirect('/register');
        return;
    }

    if(password !== repeatPassword){
        res.redirect('/register');
        return;
    }

    let userFromDb = await userService.getByUsernameAsync(username).catch(err => console.log(err));

    if(userFromDb !== null){
        res.redirect('/register');
        return;
    }

    await userService.registerAsync(username, password).catch(err => console.log(err));

    res.redirect('/login');
}

function logout(req, res){
    res.clearCookie(config.authCookieName);
    res.redirect('/');
}

module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logout
}