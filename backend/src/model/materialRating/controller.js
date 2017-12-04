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

    async createRating(req,res, next) {
      //Some error handling
      if(req.body.rating > 5)
        return next ({message: 'Rating cannot be higher than 5.', statusCode: 400});
      if(req.body.rating < 1)
        return next ({message: 'Rating cannot be lower than 1.', statusCode: 400});

      try {
        let matDoc = await materialFacade.findById(req.param("materialid"));        
        let rating = await materialRatingFacade.findOne({userid: req.body.userid, materialid: req.body.materialid });

        if(rating) {
          rating.rating = await req.body.rating;
          await rating.save();
        }
        else {
          rating = await materialRatingFacade.create(req.body);
          matDoc.rating.push(rating);          
        }
        
        await matDoc.save();
        matDoc = await materialFacade.findById(req.param("materialid"));
        return res.status(201).json(matDoc);
      } catch (e) {
        return next({message: 'Could not rate material.', statusCode: 400});
      }
    }
}

module.exports = new materialRatingContoller(materialRatingFacade);
