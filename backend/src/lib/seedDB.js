const crypto = require('crypto');
const userFacade = require('../model/user/facade');
const userController = require('../model/user/controller');
const salt = 'jod';

exports.admin = function(adminAccount) {
    userFacade.findOne({firstName: adminAccount.firstName}).then(doc => {

      if (!doc) {
          // TODO: move to schema?
          adminAccount.password = `${adminAccount.password}${salt}`;
          adminAccount.password = crypto.createHash('sha256').update(adminAccount.password).digest('hex');

          userFacade.create(adminAccount).then((doc) => {
              console.log('Added admin', doc);
          }).catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));
  }
