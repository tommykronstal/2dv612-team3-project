const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

<<<<<<< HEAD
router.route('/forum/:categoryid/thread')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

module.exports = router;
=======

router.route('/forum/thread')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));


module.exports = router;
>>>>>>> 150355c5553b47bfa7620cf1d04028b9216ef83c
