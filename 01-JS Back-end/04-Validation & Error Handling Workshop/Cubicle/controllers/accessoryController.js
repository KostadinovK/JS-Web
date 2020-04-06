const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const accessoryService = require('../services/accessoryService');
const cubeService = require('../services/cubeService');

function createGet(req, res){
    const error = req.query.error;

    res.render('createAccessory.hbs', {error, user: req.cookies[config.authCookieName]});
}

async function createPost(req, res){
    let {name, imageUrl, description} = req.body;
    let error = '';

    if(name === null || name === ''){
        error += 'Name must be not null or empty\n';
    }

    if(name.length < 5){
        error += 'Name must be atleast with length 5\n';
    }

    const validateImageRegex = new RegExp('^https?://');

    if(!validateImageRegex.test(imageUrl)){
        error += 'Image must have valid url\n';
    }

    if(description === null || description === ''){
        error += 'Description must be not null or empty\n';
    }
    
    if(error !== '') {
        res.redirect(`/create/accessory?error=${error}`);
        return;
    }

    await accessoryService.createAsync(name, imageUrl, description).catch(err => {res.redirect(`/create/accessory?error=${err.message}`); return;});

    res.redirect('/');
}

async function attachGet(req, res){
    const cubeId = req.params.id;

    let cube = await cubeService.getByIdAsync(cubeId);
    let accessories = await accessoryService.getAllUnAttachedToCubeAsync(cubeId);

    let viewModel = {
        user: req.cookies[config.authCookieName],
        cube: {
            id: cube.id,
            Name: cube.Name,
            ImageUrl: cube.ImageUrl,
        },
        accessories: []
    };

    accessories.map(a => viewModel.accessories.push({
        id: a.id,
        Name: a.Name
    }))

    viewModel.canAttachAccessories = viewModel.accessories.length > 0;

    res.render('attachAccessory.hbs', {viewModel});
}

async function attachPost(req, res){
    const cubeId = req.params.id;
    const accessoryId = req.body.accessory;

    await accessoryService.attachToCube(cubeId, accessoryId).catch(err => console.log(err));

    res.redirect('/');
}

module.exports = {
    createGet,
    createPost,
    attachGet,
    attachPost
}