const context = require('../models/index');

function getAllUnAttachedToCubeAsync(cubeId){
    return context.accessories.find({ Cubes: { $nin: cubeId } });
}

function getByIdAsync(id){
    return context.accessories.findById(id).populate('Cubes');
}

function createAsync(name, imageUrl, description){
    return context.accessories.create({
        Name: name,
        ImageUrl: imageUrl,
        Description: description
    }); 
}

async function attachToCube(cubeId, accessoryId){

    await context.cubes.updateOne({ _id: cubeId }, { $push: { Accessories: accessoryId } });
    await context.accessories.updateOne({ _id: accessoryId }, { $push: { Cubes: cubeId } });
}

module.exports = {
    getAllUnAttachedToCubeAsync,
    getByIdAsync,
    createAsync,
    attachToCube
};