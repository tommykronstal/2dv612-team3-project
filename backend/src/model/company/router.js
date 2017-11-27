const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const multer = require('multer');
const UPLOAD_PATH = './uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.registerCompany(...args));

router.route('/:companyid/product/:productid/material')
  .post(upload.single('pdf'), (...args) => controller.uploadFile(...args))
  .get((...args) => controller.find(...args));

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args))
  .post((...args) => controller.registerCompanyRep(...args));


module.exports = router;
