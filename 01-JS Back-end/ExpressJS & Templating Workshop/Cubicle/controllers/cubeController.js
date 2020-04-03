const service = require('../services/cubeService');

async function all(req, res){
    let cubes = await service.getAllAsync().catch(err => console.log(err));
    res.render('index.hbs', {cubes});
}

async function details(req, res){
    let cubeId = req.params.id;

    let cube = await service.getByIdAsync(cubeId).catch(err => console.log(err));
    res.render('details.hbs', {cube});
}

function createGet(req, res){
    res.render('create.hbs');
}

async function createPost(req, res){
    let {name, imageUrl, description, difficultyLevel} = req.body;

    difficultyLevel = Number(difficultyLevel);

    if(name === null || name === ''){
        res.redirect('/');
    }

    if(difficultyLevel <= 0 || difficultyLevel > 6){
        res.redirect('/');
    }

    await service.createAsync(name, difficultyLevel, imageUrl, description).catch(err => console.log(err));

    res.redirect('/');
}

async function search(req, res){
    let {search, from, to} = req.body;

    let cubes = await service.getAllAsync().catch(err => console.log(err));
    cubes = cubes.filter(c => c.Name.toLowerCase().includes(search.toLowerCase()));

    if(from === '' && to === ''){
        res.render('index.hbs', {search: {search, from, to}, cubes});
        return;
    }
    
    if(from !== ''){
        cubes = cubes.filter(c => c.DifficultyLevel >= +from);
    }

    if(to !== ''){
        cubes = cubes.filter(c => c.DifficultyLevel <= +to);
    }

    res.render('index.hbs', {search: {search, from, to}, cubes});
}

function about(req, res){
    res.render('about.hbs');
}

function notFound(req, res){
    res.status(404);
    res.render('404.hbs');
}

module.exports = {
    all,
    details,
    createGet,
    createPost,
    search,
    about,
    notFound
};