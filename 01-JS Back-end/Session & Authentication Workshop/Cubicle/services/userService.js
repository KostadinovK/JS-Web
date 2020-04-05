const context = require('../models/index');

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

module.exports = {
    getByIdAsync,
    getByUsernameAsync,
    registerAsync
}