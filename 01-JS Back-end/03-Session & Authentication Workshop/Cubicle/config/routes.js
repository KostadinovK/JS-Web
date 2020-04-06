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

    app.get('/logout', auth(), userController.logout);

    app.get('/', cubeController.all);

    app.get('/about', homeController.about);

    app.get('/create', auth(), cubeController.createGet);
    app.post('/create', auth(), cubeController.createPost);

    app.get('/edit/:id', auth(), cubeController.editGet);
    app.post('/edit/:id', auth(), cubeController.editPost);

    app.get('/delete/:id', auth(), cubeController.deleteGet);
    app.post('/delete/:id', auth(), cubeController.deletePost);

    app.post('/search', cubeController.search);

    app.get('/details/:id', cubeController.details);

    app.get('/create/accessory', auth(), accessoryController.createGet);
    app.post('/create/accessory', auth(), accessoryController.createPost);

    app.get('/attach/accessory/:id', auth(), accessoryController.attachGet);
    app.post('/attach/accessory/:id', auth(), accessoryController.attachPost);

    app.get('/not-found', homeController.notFound);
};