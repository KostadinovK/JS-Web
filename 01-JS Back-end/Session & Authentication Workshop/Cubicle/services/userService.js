const context = require('../models/index');
const jwt = require('../utils/jwt');

function getByIdAsync(id) {
    return context.users.findById(id);
}

function getByUsernameAsync(username) {
    return context.users.findOne({Username: username});
}

function registerAsync(username, password){

    return context.users.create({
        Username: username,
        Password: password
    });
}

function login(id){

    return jwt.create( { id } );
}

module.exports = {
    getByIdAsync,
    getByUsernameAsync,
    registerAsync,
    login
}