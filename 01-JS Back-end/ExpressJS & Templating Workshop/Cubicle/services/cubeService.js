const fs = require('fs');
const Cube = require('../models/cube');

function getAllAsync(){
    return new Promise((resolve, reject) => {
        fs.readFile('./config/database.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            
            resolve(JSON.parse(data));
        });
    });
}

function getByIdAsync(id){
    return new Promise((resolve, reject) => {
        fs.readFile('./config/database.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            
            let cubes = JSON.parse(data);

            if(!cubes.some(c => c.Id === id)){
                reject(new Error("Invalid id!"));
            }

            resolve(cubes.filter(c => c.Id === id)[0]);
        });
    });
}

function createAsync(name, difficultyLevel, imageUrl = null, description = null){

    return new Promise((resolve, reject) => {
        let cube = new Cube(name, +difficultyLevel, description, imageUrl);

        fs.readFile('./config/database.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            
            let cubes = JSON.parse(data);

            cubes.push(cube);

            fs.writeFile('./config/database.json', JSON.stringify(cubes), 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    });
}

function searchAsync(search, from, to){

    return new Promise(async (resolve, reject) => {
        let cubes = await getAllAsync().catch(err => reject(err));

        cubes = cubes.filter(c => c.Name.toLowerCase().includes(search.toLowerCase()));
        
        if(from !== ''){
            cubes = cubes.filter(c => c.DifficultyLevel >= +from);
        }
    
        if(to !== ''){
            cubes = cubes.filter(c => c.DifficultyLevel <= +to);
        }

        resolve(cubes);
    });
}

module.exports = {
    getAllAsync,
    getByIdAsync,
    createAsync,
    searchAsync
};