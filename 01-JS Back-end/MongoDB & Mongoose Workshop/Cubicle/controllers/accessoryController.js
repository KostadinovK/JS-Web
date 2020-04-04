const service = require('../services/accessoryService');

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

    await service.createAsync(name, imageUrl, description).catch(err => console.log(err));

    res.redirect('/');
}

module.exports = {
    createGet,
    createPost
}