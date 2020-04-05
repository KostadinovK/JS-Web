const userService = require('../services/userService');

function loginGet(req, res){
    res.render('login.hbs');
}

function loginPost(req, res){
    res.render('about.hbs');
}

function registerGet(req, res){
    res.render('register.hbs');
}

async function registerPost(req, res){
    const { username, password, repeatPassword} = req.body;

    if(username === null || username === ''){
        res.redirect('/register');
        return;
    }

    if(password === null || password === ''){
        res.redirect('/register');
        return;
    }

    if(password !== repeatPassword){
        res.redirect('/register');
        return;
    }

    let user = await userService.getByUsernameAsync(username).catch(err => console.log(err));

    if(user !== null){
        res.redirect('/register');
        return;
    }

    await userService.registerAsync(username, password).catch(err => console.log(err));

    res.redirect('/login');
}

module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost
}