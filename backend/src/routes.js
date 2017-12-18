const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const company = require('./model/company/router');
const product = require('./model/product/router');
const category = require('./model/category/router');
const material = require('./model/material/router');
const materialRating = require('./model/materialRating/router');
const forumThread = require('./model/thread/router');

const authorize = require('./lib/auth/Auth');

router.route('/api').get((req, res) => {
  res.json({message: 'Welcome to backend API!'})
});

router.route('*').all(function (req, res, next) {
    if (req.url === '/api/user/login' || req.url === '/api/user/register') return next();

    authorize(req, res, next);
});

router.use('/api/user', user);
router.use('/api/company', company);
router.use('/api/category', category);
router.use('/api/product/material', material);
router.use('/api/product/material',  materialRating);
router.use('/api/', product);
router.use('/api/forum', thread)

module.exports = router;
