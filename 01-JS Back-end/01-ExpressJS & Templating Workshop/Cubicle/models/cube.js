const uniqid = require('uniqid');

module.exports = class Cube {
    Id;
    Name;
    Description;
    ImageURL;
    DifficultyLevel;
    constructor(name, difficultyLevel, description = null, imageURL = null){
        
        if(name === null || name === ''){
            throw new Error('Invalid Name!');
        }

        if(difficultyLevel <= 0 || difficultyLevel > 6){
            throw new Error('Invalid Difficulty Level!');
        }

        this.Id = uniqid();
        this.Name = name;
        this.Description = description;
        this.ImageURL = imageURL;
        this.DifficultyLevel = difficultyLevel;
    }
}