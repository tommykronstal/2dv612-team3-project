const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const checkRole = require('../../lib/auth/checkRole');
const admin = require("../../lib/roles").admin;

router.route('/')
  .get((...args) => controller.find(...args))
  .post(checkRole(admin), (...args) => controller.create(...args));

router.route('/:id')
  .put(checkRole(admin), (...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete(checkRole(admin), (...args) => controller.remove(...args));

module.exports = router;
