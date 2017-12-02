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



mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

seedDB.admin(config.admin_account);
app.use('/', routes);

app.use(function (err, req, res, next) {
    console.log(err);
    if (err.name === "CastError"){
        console.log("Found write error", err.httpStatusCode);
        err.statusCode = 400;
    }
    res.status(err.statusCode).send(err.message);
});

app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
