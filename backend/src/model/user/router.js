const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const checkRole = require('../../lib/auth/checkRole');
const admin = require("../../lib/roles").admin;
const user = require("../../lib/roles").user;

router.route('/')
  .get(checkRole(admin), (...args) => controller.find(...args))
  .post(checkRole(admin),(...args) => controller.create(...args));

router.route('/:id')
  .put(checkRole(admin),(...args) => controller.update(...args))
  .get(checkRole(admin, user),(...args) => controller.findById(...args))
  .delete(checkRole(admin),(...args) => controller.remove(...args));

router.route('/login')
  .post((...args) => controller.login(...args));

router.route('/register')
  .post((...args) => controller.register(...args));

module.exports = router;
