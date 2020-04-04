const homeController = require('../controllers/homeController');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');

module.exports = (app) => {
    app.get('/', cubeController.all);

    app.get('/about', homeController.about);

    app.get('/create', cubeController.createGet);

    app.post('/create', cubeController.createPost);

    app.post('/search', cubeController.search);

    app.get('/details/:id', cubeController.details);

    app.get('/create/accessory', accessoryController.createGet);

    app.post('/create/accessory', accessoryController.createPost);

    app.get('/not-found', homeController.notFound);
};