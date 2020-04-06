const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const userService = require('../services/userService');

function loginGet(req, res){
    const error = req.query.error;

    res.render('login.hbs', {error, user: req.cookies[config.authCookieName]});
}

async function loginPost(req, res){
    const { username, password } = req.body;

    let userFromDb = await userService.getByUsernameAsync(username).catch(err => console.log(err));

    let error = '';

    let isPassCorect = userFromDb.matchPassword(password);

    if(userFromDb === null || !isPassCorect){
        error = 'Invalid username or password!'
        res.redirect(`/login?error=${error}`);
        return;
    }

    let jwt = userService.login(userFromDb.id);

    res.cookie(config.authCookieName, jwt);
    res.redirect('/');
}

function registerGet(req, res){
    const error = req.query.error;

    res.render('register.hbs', {error, user: req.cookies[config.authCookieName]});
}

async function registerPost(req, res){
    const { username, password, repeatPassword} = req.body;

    const validateUsernameAndPassRegex = new RegExp('^[a-zA-Z0-9]*$');

    let error = '';

    if(username === null || username.length < 5 || !validateUsernameAndPassRegex.test(username)){
        error += 'Username is not valid\n';
    }

    if(password === null || password.length < 8 || !validateUsernameAndPassRegex.test(password)){
        error += 'Password is not valid\n';
    }

    if(password !== repeatPassword){
        error += 'Passwords does not match\n';
    }

    let userFromDb = await userService.getByUsernameAsync(username).catch(err => console.log(err));

    if(userFromDb !== null){
        error += 'User already registered\n';
    }

    if(error !== ''){
        res.redirect(`/register?error=${error}`);
        return;
    }

    await userService.registerAsync(username, password).catch(err => { res.redirect(`/register?error=${error}`); return;});

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