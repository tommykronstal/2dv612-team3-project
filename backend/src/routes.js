const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const company = require('./model/company/router');
const product = require('./model/product/router');
const category = require('./model/category/router');

const auth = require('./lib/auth/Auth');

router.route('/api').get((req, res) => {
  res.json({message: 'Welcome to backend API!'})
});

router.route('*').all(function (req, res, next) {
    if (req.url === '/api/user/login') return next();
    if (req.url === '/api/user/register' || (req.url === '/api/product' && req.body.role === 'USER')) return next();
    auth.authorize(req, res, next);
});

router.use('/api/user', user);
router.use('/api/company', company);
router.use('/api/category', category);
router.use('/api/', product);

module.exports = router;
