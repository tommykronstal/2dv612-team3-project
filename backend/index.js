const express    = require('express');
const mongoose   = require('mongoose');
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const bluebird   = require('bluebird');

const cors = require('cors');
const config = require('./src/config');
const routes = require('./src/routes');
const seedDB  = require('./src/lib/seedDB');
const app  = express();
const validateError = require('./src/lib/validateError');

mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

seedDB.admin(config.admin_account);

if(process.env.NODE_ENV !== 'production') {
    seedDB.companies(config.companies);
    seedDB.users(100);
}
app.use('/', routes);

app.use(function (err, req, res, next) {
    validateError(err);
    console.log(err);
    res.status(err.statusCode).send({error: true, message: err.message});
});

app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
