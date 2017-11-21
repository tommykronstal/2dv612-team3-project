const Router = require('express').Router
const router = new Router()

const user = require('./model/user/router')
const company = require('./model/company/router')
const controller = require('./model/user/controller')

router.route('/api').get((req, res) => {
  res.json({message: 'Welcome to backend API!'})
})

router.route('*').all(function(req, res, next) {
  if (req.url === '/api/user/login' || req.url === '/api/user/register') {
    return next()
  }

  controller.authorize(req, res, next)
})

router.use('/api/user', user)
router.use('/api/company', company)

module.exports = router
