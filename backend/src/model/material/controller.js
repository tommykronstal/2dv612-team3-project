const Controller = require('../../lib/controller');
const materialFacade = require('./facade');
const annotationFacade = require('../annotation/facade');

class MaterialController extends Controller {

  async addAnnotation(req, res, next) {
    const annotation = req.body.annotation;
    const useremail = res.locals.email;
    const material = req.params.id;

    // TODO: Why is this an async/await promise chain ? Clean this up
    await annotationFacade.find({email: useremail, materialid: material}).then(doc => {
        if (!doc.length) {
            annotationFacade.create({email: useremail, materialid: material, annotation: annotation}).then(doc => {
                res.status(201).json({error: false, annotation: annotation, email: useremail, materialid: material});
            }).catch((e => { res.status(500).json({error: true, message: "Could not save annotation"}); console.log(e) }));
        } else {
            annotationFacade.update({email: useremail, materialid: material}, {annotation: annotation}).then(doc => {
                res.status(200).json({error: false, annotation: annotation, email: useremail, materialid: material});
            }).catch((e => { res.status(500).json({error: true, message: "Could not save annotation"}); console.log(e) }));
        }
    })
    .catch((e) => { res.status(500).json({error: true, message: "Could not save annotation"}); console.log(e) });
  }

  async getMaterial(req, res, next) {
      const useremail = res.locals.email;
      const material = req.params.id;
      let annotation;

      await annotationFacade.find({email: useremail, materialid: material}).then(a => {
        annotation = a[0].annotation;
      }).catch((e) => { console.log(e) });

      await materialFacade.find({_id: material}).then(doc => {
        if (annotation) {
            res.status(200).json({error: false, annotation: annotation, name: doc[0].name, originalname: doc[0].originalname, filename: doc[0].originalname, path: doc[0].path, size: doc[0].size, mimetype: doc[0].mimetype, avgRating: doc[0].avgRating, rating: doc[0].rating});
        } else {
            res.status(200).json({error: false, annotation: "", name: doc[0].name, originalname: doc[0].originalname, filename: doc[0].originalname, path: doc[0].path, size: doc[0].size, mimetype: doc[0].mimetype, avgRating: doc[0].avgRating, rating: doc[0].rating});
        }
      }).catch((e) => { res.status(500).json({error: true, message: "Could not get material"}); console.log(e) });
  }
}

module.exports = new MaterialController(materialFacade);
