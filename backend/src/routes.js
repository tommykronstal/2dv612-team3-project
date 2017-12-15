const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const company = require('./model/company/router');
const product = require('./model/product/router');
const category = require('./model/category/router');
const material = require('./model/material/router');
const materialRating = require('./model/materialRating/router');

const auth = require('./lib/auth/Auth');
const checkRole = require('./lib/auth/checkRole');

const ADMIN = "ADMIN";
const COMPANYADMIN = "COMPANY_ADMIN";
const COMPANYREP = "COMPANY_REP";
const USER = "USER";
const ALL = [ADMIN, COMPANYADMIN, COMPANYREP, USER];

router.route('/api').get((req, res) => {
  res.json({message: 'Welcome to backend API!'})
});

router.route('*').all(function (req, res, next) {
    if (req.url === '/api/user/login'){
        return next();
    }else if (req.url === '/api/user/register') {
        return next();
    }else {
        checkRole.getToken(req, res, next);
        auth.authorize(req, res, next);
    }
});

router.use('/api/user', checkRole.checkApiUser([ADMIN]), user);
router.use('/api/company', checkRole.checkApiCompany([ADMIN, COMPANYREP,COMPANYADMIN]), company);
router.use('/api/category', checkRole.checkApiCategory(ALL), category);
router.use('/api/product/material', checkRole.checkApiMaterial([ALL]), material);
router.use('/api/product/material', checkRole.checkApiMaterial([ALL]), materialRating);
router.use('/api/', checkRole.checkApiProduct([ALL]), product);

module.exports = router;
