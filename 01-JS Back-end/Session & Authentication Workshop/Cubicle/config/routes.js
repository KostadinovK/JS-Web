const auth = require('../utils/auth');
const homeController = require('../controllers/homeController');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');
const userController = require('../controllers/userController');

module.exports = (app) => {

    app.get('/register', userController.registerGet);
    app.post('/register', userController.registerPost);

    app.get('/login', userController.loginGet);
    app.post('/login', userController.loginPost);

    app.get('/logout', userController.logout);

    app.get('/', cubeController.all);

    app.get('/about', homeController.about);

    app.get('/create', auth(), cubeController.createGet);
    app.post('/create', cubeController.createPost);

    app.post('/search', cubeController.search);

    app.get('/details/:id', cubeController.details);

    app.get('/create/accessory', accessoryController.createGet);
    app.post('/create/accessory', accessoryController.createPost);

    app.get('/attach/accessory/:id', accessoryController.attachGet);
    app.post('/attach/accessory/:id', accessoryController.attachPost);

    app.get('/not-found', homeController.notFound);
};