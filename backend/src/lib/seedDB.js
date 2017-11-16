const userFacade = require('../model/user/facade');
const userController = require('../model/user/controller');

exports.admin = function(adminAccount) {
    userFacade.findOne({firstName: adminAccount.firstName}).then(doc => {

      if (!doc) {

          let req = {
              body: adminAccount,
          };

          userController.register(req);

      }
    })
    .catch((e) => console.log(e));
  }
