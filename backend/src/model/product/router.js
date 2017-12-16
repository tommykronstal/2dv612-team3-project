const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const multer = require('multer');
const UPLOAD_PATH = './src/filesystem/uploads/uploads';
const upload = multer({dest: `${UPLOAD_PATH}/`}); // multer configuration
const checkRole = require('../../lib/auth/checkRole');
const companyGroup = require("../../lib/roles").companyGroup;

router.route('/company/:companyid/product')
  .get((...args) => controller.findForCompany(...args))
  .post(checkRole.checkRoles(companyGroup), (...args) => controller.create(...args));

router.route('/product')
  .get((...args) => controller.find(...args));

router.route('/product/:id')
  .get((...args) => controller.findByIdIncludeCompany(...args));

router.route('/company/:companyid/product/:id')
  .put(checkRole.checkRoles(companyGroup), upload.single('pdf'), (...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete(checkRole.checkRoles(companyGroup), (...args) => controller.remove(...args));

router.route('/search')
  .get((...args) => controller.search(...args));

module.exports = router;
