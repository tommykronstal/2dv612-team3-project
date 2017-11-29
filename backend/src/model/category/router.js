const controller = require('./controller');
const Router = require('express').Router;
const routerAdmin = new Router();
const routerUser = new Router();

routerAdmin.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

routerAdmin.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));

routerUser.route('/')
  .get((...args) => controller.find(...args));

routerUser.route('/:id')
  .get((...args) => controller.findById(...args));

module.exports = {
    admin: routerAdmin,
    user: routerUser
};
