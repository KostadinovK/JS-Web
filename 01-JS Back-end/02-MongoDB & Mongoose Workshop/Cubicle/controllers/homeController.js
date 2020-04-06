function about(req, res){
    res.render('about.hbs');
}

function notFound(req, res){
    res.status(404);
    res.render('404.hbs');
}

module.exports = {
    about,
    notFound
}