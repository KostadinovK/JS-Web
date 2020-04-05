const context = require('../models/index');

function getByIdAsync(id) {
    return context.users.findById(id);
}

module.exports = {
    getByIdAsync
}