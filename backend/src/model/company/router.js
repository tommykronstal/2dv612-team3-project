const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const checkRole = require('../../lib/auth/checkRole');
const companyUser = require("../../lib/roles").companyGroup;
const companyAdminGroup = require("../../lib/roles").companyAdminGroup;
const admin = require("../../lib/roles").admin;

router.route('/')
  .get(checkRole.checkRoles(admin), (...args) => controller.find(...args))
  .post(checkRole.checkRoles(admin), (...args) => controller.registerCompany(...args));

router.route('/:id')
  .put(checkRole.checkRoles(companyAdminGroup), (...args) => controller.update(...args))
  .get(checkRole.checkRoles(companyUser), (...args) => controller.findById(...args))
  .delete(checkRole.checkRoles(companyAdminGroup), (...args) => controller.remove(...args))
  .post(checkRole.checkRoles(companyAdminGroup), (...args) => controller.registerCompanyRep(...args));

module.exports = router;
