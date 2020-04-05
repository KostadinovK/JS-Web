const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

async function all(req, res){
    let cubes = await cubeService.getAllAsync().catch(err => console.log(err));

    let cubesViewModel = [];

    cubes.map(c => cubesViewModel.push({
        id: c.id,
        name: c.Name,
        imageUrl: c.ImageUrl,
        level: c.DifficultyLevel
    }));

    res.render('index.hbs', {user: req.cookies[config.authCookieName], cubes: cubesViewModel});
}

async function details(req, res){
    let cubeId = req.params.id;

    let {id, Name, Description, ImageUrl, DifficultyLevel} = await cubeService.getByIdAsync(cubeId).catch(err => console.log(err));

    let accessories = await accessoryService.getAllAttachedToCubeAsync(id);

    let viewModel = {
        user: req.cookies[config.authCookieName],
        cube: {
            id,
            Name,
            Description,
            ImageUrl,
            DifficultyLevel,
            HasAccessories: accessories.length !== 0
        },
        accessories: []
    };

    accessories.map(a => viewModel.accessories.push({
        Name: a.Name,
        Description: a.Description,
        ImageUrl: a.ImageUrl
    }));

    res.render('details.hbs', {viewModel});
}

function createGet(req, res){
    res.render('create.hbs', {user: req.cookies[config.authCookieName]});
}

async function createPost(req, res){
    let {name, imageUrl, description, difficultyLevel} = req.body;

    difficultyLevel = Number(difficultyLevel);

    if(name === null || name === ''){
        res.redirect('/');
    }

    const validateImageRegex = new RegExp('^https?://');

    if(!validateImageRegex.test(imageUrl)){
        res.redirect('/');
    }

    if(description === null || description === '' || description.length > 200){
        res.redirect('/');
    }

    if(difficultyLevel <= 0 || difficultyLevel > 6){
        res.redirect('/');
    }

    await cubeService.createAsync(name, difficultyLevel, imageUrl, description).catch(err => console.log(err));

    res.redirect('/');
}

async function search(req, res){
    let {search, from, to} = req.body;

    if(isNaN(from) && from !== ''){
        res.redirect('/');
        return;
    }

    if(isNaN(to) && to !== ''){
        res.redirect('/');
        return;
    }

    let cubes = await cubeService.searchAsync(search, from, to).catch(err => console.log(err));

    let cubesViewModel = [];

    cubes.map(c => cubesViewModel.push({
        id: c.id,
        name: c.Name,
        imageUrl: c.ImageUrl,
        level: c.DifficultyLevel
    }));

    res.render('index.hbs', {user: req.cookies[config.authCookieName], search: {search, from, to}, cubes: cubesViewModel});
}

module.exports = {
    all,
    details,
    createGet,
    createPost,
    search
};