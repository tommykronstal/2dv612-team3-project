var mockingoose = require('mockingoose').default;
var model = require('../model/user/schema');

describe('test mongoose user password hashing', () => {
  it('should return a hashed password', () => {
      const _doc = {
          _id: '507f191e810c19729de860ea',
          firstName: 'first',
          lastName: 'last',
          email: 'name@email.com',
          password: 'none',
          role: 'ADMIN'
      };

        return model
        .create(_doc).then(doc => {
            expect(doc.password).not.toBe(_doc.password);
        })
    })
})