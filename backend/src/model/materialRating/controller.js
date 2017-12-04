const Controller = require('../../lib/controller');
const materialRatingFacade = require('./facade');
const materialFacade = require("../material/facade");

class materialRatingContoller extends Controller {
    findForMaterial(req, res, next) {
        materialFacade.findById(req.param("materialid")).then(doc => {
          res.status(200).json(doc.material);
        });
    }

    create(req, res, next) {
        let material;
    
        materialFacade
          .findById(req.param("materialid"))
          .then(matDoc => {
            material = matDoc;
            return materialRatingFacade.create(req.body);
          })
          .then(matDoc => {
            material.rating.push(matDoc);
            return material.save();
          })
          .then(matDoc => {
            res.status(201).json(matDoc.material);
          })
          .catch((e) => { return next({message: 'Could not rate material.', statusCode: 400}) });
    }    
}

module.exports = new materialRatingContoller(materialRatingFacade);
