const accessoryService = require('../services/accessoryService');
const cubeService = require('../services/cubeService');

function createGet(req, res){
    res.render('createAccessory.hbs');
}

async function createPost(req, res){
    let {name, imageUrl, description} = req.body;

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

    await accessoryService.createAsync(name, imageUrl, description).catch(err => console.log(err));

    res.redirect('/');
}

async function attachGet(req, res){
    const cubeId = req.params.id;

    let cube = await cubeService.getByIdAsync(cubeId);
    let accessories = await accessoryService.getAllUnAttachedToCubeAsync(cubeId);

    let viewModel = {
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