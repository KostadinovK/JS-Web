const context = require('../models/index');

function getAllAsync(){
    return context.cubes.find();
}

function getByIdAsync(id){
    return context.cubes.findById(id).populate('Accessories');
}

function createAsync(name, difficultyLevel, imageUrl, description){
    return context.cubes.create({
        Name: name,
        ImageUrl: imageUrl,
        DifficultyLevel: difficultyLevel,
        Description: description
    }); 
}

function searchAsync(search, from, to){
    let query = {};

    if (to !== '') {
      query = { ...query, DifficultyLevel: { $lte: +to } };
    }

    if (from !== '') {
      query = {
        ...query,
        DifficultyLevel: { ...query.DifficultyLevel, $gte: +from }
      };
    }

    return new Promise(async (resolve, reject) => {
        let cubes = await context.cubes.find(query).catch(err => reject(err));

        cubes = cubes.filter(c => c.Name.toLowerCase().includes(search.toLowerCase()));
        resolve(cubes);
    });
}

module.exports = {
    getAllAsync,
    getByIdAsync,
    createAsync,
    searchAsync
};