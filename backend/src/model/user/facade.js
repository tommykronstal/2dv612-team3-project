const Facade = require('../../lib/facade');
const userSchema = require('./schema');

class UserFacade extends Facade {

  findOneLogin(...args) {
    return new Promise((resolve, reject) => {
      this.Schema.findOne(...args).then(doc => {
        if (!doc || doc === undefined || doc.errors !== undefined) return reject({ message: 'No such user found', statusCode: 404 });
        return resolve(doc);
      }).catch(e => {
        return reject({message: e.message, statusCode: 500});
      })

    });
  }

  createUser(...args) {
    return new Promise((resolve, reject) => {
      this.Schema.create(args).then(userDocument => {
        if (userDocument[0] === undefined || userDocument[0].errors !== undefined)
          return reject({message: "User could not be created", statusCode: 400});
        return resolve(userDocument[0])
        //todo why does the base facade save return an array?
      }).catch(e => {
        if (e.code === 11000) return reject({message: "User already exists", statusCode: 409});
        return reject({message: "createUser failed", statusCode: 500})
      })
    })
  }

}

module.exports = new UserFacade(userSchema);
