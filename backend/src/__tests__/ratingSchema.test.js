var mockingoose = require('mockingoose').default;
var ratingModel = require('../model/materialRating/schema');
var ratingModelFacade = require('../model/materialRating/facade');
var materialModel = require('../model/material/schema');
var userModel = require('../model/user/schema');

const _matDoc = {
    _id: '5a2592f8e82225417029afed',
    name: 'matTest',
    originalname: 'matTest.pdf',
    filename: '8fc9e5b58e710dc7db26dd5901111d48',
    path: 'src\\filesystem\\uploads\\8fc9e5b58e710dc7db26dd5901111d49',
    size: 200,
    mimetype: 'application/pdf'
};

describe('test rating a material document', () => {
    it('should return a doc with 0 avgRating', () => {
        mockingoose.Material.toReturn(_matDoc, 'findOne');
        return materialModel
        .findById({_id: '5a2592f8e82225417029afed'})
        .then(matDoc => {
            expect(matDoc.avgRating).toBe(0);
        })
    });
});
