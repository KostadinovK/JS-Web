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
    cubes = cubes.filter(c => c.Name.includes(search));

    if(from === '' && to === ''){
        res.render('index.hbs', {cubes});
        return;
    }
   
    
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