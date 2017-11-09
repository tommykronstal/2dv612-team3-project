const express    = require('express');
const mongoose   = require('mongoose');
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const bluebird   = require('bluebird');

const config = require('./src/config');
const routes = require('./src/routes');
//const auth = require('./routes/auth');
const app  = express();

mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/', routes);
//app.use('/auth', auth);


app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
