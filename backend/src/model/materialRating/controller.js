const Controller = require('../../lib/controller');
const materialRatingFacade = require('./facade');
const materialFacade = require("../material/facade");
const userFacade = require("../user/facade");
const jwt = require('jsonwebtoken');

const ratingMin = 1;
const ratingMax = 5;

class materialRatingContoller extends Controller {

    findForMaterial(req, res, next) {
        materialFacade.findById(req.param("materialid")).then(doc => {
          res.status(200).json(doc.rating);
        })
        .catch((e) => { return next({message: 'Could not find material.', statusCode: 400}) });
    }

    async createRating(req,res, next) {
      //Some error handling
      if(req.body.rating > ratingMax)
        return next ({message: 'Rating cannot be higher than ' + ratingMax, statusCode: 400});
      if(req.body.rating < ratingMin)
        return next ({message: 'Rating cannot be lower than ' + ratingMin, statusCode: 400});


      const decodedToken = jwt.verify(req.headers.authorization, 'keyboardcat');
      const materialid = req.param("materialid");

      try {
        let userDoc = await userFacade.findOneLogin({ email: decodedToken.email });
        let matDoc = await materialFacade.findById(materialid);        
        let rating = await materialRatingFacade.findOne({userid: userDoc._id, materialid });

        if(rating) {
          rating.rating = req.body.rating;
          await rating.save();
        }
        else {
          rating = await materialRatingFacade.create({
            userid: userDoc._id,
            materialid,
            rating: req.body.rating
          });
          matDoc.rating.push(rating);
          await matDoc.save(); 
        }
        
        matDoc = await materialFacade.findById(materialid);

        return res.status(201).json(matDoc);
      } catch (e) {
        console.log(e)
        return next({message: 'Could not rate material.', statusCode: 400});
      }
    }
}

module.exports = new materialRatingContoller(materialRatingFacade);
