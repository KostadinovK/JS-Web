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

    if(isNaN(from) && from !== ''){
        res.redirect('/');
        return;
    }

    if(isNaN(to) && to !== ''){
        res.redirect('/');
        return;
    }

    let cubes = await service.searchAsync(search, from, to).catch(err => console.log(err));

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