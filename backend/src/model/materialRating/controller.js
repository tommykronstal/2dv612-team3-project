const Controller = require('../../lib/controller');
const materialRatingFacade = require('./facade');
const materialFacade = require("../material/facade");

class materialRatingContoller extends Controller {

    findForMaterial(req, res, next) {
        materialFacade.findById(req.param("materialid")).then(doc => {
          res.status(200).json(doc.rating);
        })
        .catch((e) => { return next({message: 'Could not find material.', statusCode: 400}) });
    }

    createRating(req, res, next) {
        let material;

        materialFacade
          .findById(req.param("materialid"))
          .then(matDoc => {
            material = matDoc;

            //Some error handling
            if(req.body.rating > 5)
              return next ({message: 'Rating cannot be higher than 5.', statusCode: 400});
            if(req.body.rating < 1)
              return next ({message: 'Rating cannot be lower than 1.', statusCode: 400});

            return materialRatingFacade.create(req.body);
          })
          .then(matDoc => {
            material.rating.push(matDoc);
            return material.save();
          })
          .then(matDoc => {
            res.status(201).json(matDoc);
          })
          .catch((e) => { return next({message: 'Could not rate material.', statusCode: 400}) });
    }    
}

module.exports = new materialRatingContoller(materialRatingFacade);
