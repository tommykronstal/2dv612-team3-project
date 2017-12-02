const Facade = require('../../lib/facade');
const userSchema = require('./schema');

class UserFacade extends Facade {

  findOneLogin(...args) {
    return new Promise((resolve, reject) => {
      this.Schema.findOne(...args).then(doc => {
        if (!doc || doc === undefined || doc.errors !== undefined) return reject({ message: 'No such user found' });
        return resolve(doc);
      }).catch(e => {
        return reject(e);
      })

    });
  }

  createUser(...args) {
    return new Promise((resolve, reject) => {
      this.Schema.create(args).then(userDocument => {
        if (userDocument[0] === undefined || userDocument[0].errors !== undefined) return reject("User could not be created");
        return resolve(userDocument[0])
        //todo why does the base facade save return an array?
      }).catch(e => {
        console.log(e);
        if (e.code === 11000) return reject("User already exists");
        return reject("createUser catch")
      })
    })
  }

}

module.exports = new UserFacade(userSchema);
