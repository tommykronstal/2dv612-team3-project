const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const company = require('./model/company/router');

router.route('/api').get((req, res) => {
  res.json({ message: 'Welcome to backend API!' });
});

router.use('/api/user', user);
router.use('/api/company', company);

module.exports = router;
