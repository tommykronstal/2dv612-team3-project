const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const checkRole = require('../../lib/auth/checkRole');
const admin = require("../../lib/roles").admin;
const checkRoleCompany = require('../../lib/auth/checkRoleCompany');

router.route('/')
  .get(checkRole(admin), (...args) => controller.find(...args))
  .post(checkRole(admin), (...args) => controller.registerCompany(...args));

router.route('/:id').all(function (req, res, next) {
    checkRoleCompany(req, res, next);
});

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args))
  .post((...args) => controller.registerCompanyRep(...args));

module.exports = router;
