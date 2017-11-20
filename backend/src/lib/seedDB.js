const userFacade = require('../model/user/facade');
const userController = require('../model/user/controller');
const salt = 'jod';

exports.admin = function(adminAccount) {
    userFacade.findOne({firstName: adminAccount.firstName}).then(doc => {

      if (!doc) {

          userFacade.create(adminAccount).then((doc) => {
              console.log('Added admin', doc);
          }).catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));
  }
