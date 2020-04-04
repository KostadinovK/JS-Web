const cubeController = require('../controllers/cubeController');

module.exports = (app) => {
    app.get('/', cubeController.all);

    app.get('/about', cubeController.about);

    app.get('/create', cubeController.createGet);

    app.post('/create', cubeController.createPost);

    app.post('/search', cubeController.search);

    app.get('/details/:id', cubeController.details);

    app.get('/not-found', cubeController.notFound);
};