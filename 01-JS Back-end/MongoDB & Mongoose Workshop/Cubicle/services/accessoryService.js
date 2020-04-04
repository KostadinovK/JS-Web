const context = require('../models/index');

function getByIdAsync(id){
    return context.accessories.findById(id);
}

function createAsync(name, imageUrl, description){
    return context.accessories.create({
        Name: name,
        ImageUrl: imageUrl,
        Description: description
    }); 
}

module.exports = {
    getByIdAsync,
    createAsync
};