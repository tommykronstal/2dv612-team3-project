var mockingoose = require('mockingoose').default;
var model = require('../model/user/schema');

const _doc = {
    _id: '507f191e810c19729de860ea',
    firstName: 'first',
    lastName: 'last',
    email: 'name@email.com',
    password: 'some password',
    role: 'some role'
};

describe('test mongoose user password hashing', () => {
  it('should return a hashed password', () => {

        return model
        .create(_doc).then(doc => {
            expect(doc.password).not.toBe(_doc.password);
        });
    });
});

describe('test mongoose User model', () => {
    it('should return the doc with findById', () => {

      mockingoose.User.toReturn(_doc, 'findOne');

      return model
      .findById({ _id: '507f191e810c19729de860ea'})
      .then(doc => {
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
  });

    it('should return the doc with update', () => {

        mockingoose.User.toReturn(_doc, 'update');

        return model
        .update({ firstName: 'changed' })
        .where({ _id: '507f191e810c19729de860ea'})
        .then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    it('should return error for missing details', () => {
         mockingoose.User.toReturn(new Error(), 'save');
         return model
         .create({})
         .catch(err => {
             expect(err).toBeInstanceOf(Error);
         });
    });
});
