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
    const error = req.query.error;

    res.render('create.hbs', {error, user: req.cookies[config.authCookieName]});
}

async function createPost(req, res){
    let {name, imageUrl, description, difficultyLevel} = req.body;
    const user = req.user;

    let error = '';

    difficultyLevel = Number(difficultyLevel);
    
    if(name === null || name === ''){
        error += 'Name must be not null or empty string\n';
    }

    const validateImageRegex = new RegExp('^https?://');

    if(!validateImageRegex.test(imageUrl)){
        error += 'Image must have valid url\n';
    }

    if(description === null || description === ''){
        error += 'Description must be not null or empry string\n';
    }

    if(difficultyLevel <= 0 || difficultyLevel > 6){
        error += 'Difficulty Level must be between 1 and 6\n';
    }

    if(error !== ''){
        res.redirect(`/create?error=${error}`);
        return;
    }

    await cubeService.createAsync(name, difficultyLevel, imageUrl, description, user.id).catch(err => {res.redirect(`/create?error=${error}`); return;});

    res.redirect(`/`);
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

async function editGet(req, res){
    const user = req.user;
    const id = req.params.id;

    const error = req.query.error;

    if(!await cubeService.isCubeCreatedByUserAsync(id, user.id)){
        res.redirect('/');
        return;
    }

    const cube = await cubeService.getByIdAsync(id);

    const viewModel = {
        error,
        user: req.cookies[config.authCookieName],
        cube: {
            id: cube.id,
            Name: cube.Name,
            ImageUrl: cube.ImageUrl,
            Description: cube.Description,
            DifficultyLevel: cube.DifficultyLevel
        }
    };

    res.render('editCube.hbs', {viewModel});
}

async function editPost(req, res){
    const id = req.params.id;
    let {name, imageUrl, description, difficultyLevel} = req.body;

    let error = '';

    difficultyLevel = Number(difficultyLevel);

    if(name === null || name === ''){
        error += 'Name must be not null or empty string\n';
    }

    const validateImageRegex = new RegExp('^https?://');

    if(!validateImageRegex.test(imageUrl)){
        error += 'Image must have valid url\n';
    }

    if(description === null || description === ''){
        error += 'Description must be not null or empry string\n';
    }

    if(difficultyLevel <= 0 || difficultyLevel > 6){
        error += 'Difficulty Level must be between 1 and 6\n';
    }
    
    if(error !== '') {
        res.redirect(`/edit/${id}?error=${error}`);
        return;
    }

    await cubeService.editAsync(id, name, difficultyLevel, imageUrl, description).catch(err => {res.redirect(`/edit/${id}?error=${err.message}`); return;});

    res.redirect('/');
}

async function deleteGet(req, res){
    const user = req.user;
    const id = req.params.id;

    if(!await cubeService.isCubeCreatedByUserAsync(id, user.id)){
        res.redirect('/');
        return;
    }

    const cube = await cubeService.getByIdAsync(id);

    const viewModel = {
        user: req.cookies[config.authCookieName],
        cube: {
            id: cube.id,
            Name: cube.Name,
            ImageUrl: cube.ImageUrl,
            Description: cube.Description,
            DifficultyLevel: cube.DifficultyLevel
        }
    };

    res.render('deleteCube.hbs', {viewModel});
}

async function deletePost(req, res){
    const id = req.params.id;

    await cubeService.deleteAsync(id);
    res.redirect('/');
}

module.exports = {
    all,
    details,
    createGet,
    createPost,
    search,
    editGet,
    editPost,
    deleteGet,
    deletePost
};