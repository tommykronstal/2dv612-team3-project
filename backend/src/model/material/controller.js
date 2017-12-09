const Controller = require('../../lib/controller');
const materialFacade = require('./facade');
const jwt = require('jsonwebtoken');
const annotationFacade = require('../annotation/facade');
//const materialFacade = require('../material/facade');

class MaterialController extends Controller {

  async createAnnotation(req, res, next) {
    
    const annotation = req.body.annotation;
    const useremail = jwt.verify(req.headers.authorization, 'keyboardcat').email;
    const material = req.params.id;

    await annotationFacade.find({email: useremail, materialid: material}).then(doc => {
        console.log(doc);
        if (!doc.length) {
            annotationFacade.create({email: useremail, materialid: material, annotation: annotation});
        } else {
            const newAnnotation = doc[0].annotation + "\n" + annotation;
            
            annotationFacade.update({email: useremail, materialid: material, annotation: newAnnotation});
        }
        res.status(201).json({error: false, annotation: annotation, email: useremail, materialid: material});
    })
    .catch((e) => { console.log(e) });

  }


  async getAnnotation(req, res, next) {
      const useremail = jwt.verify(req.headers.authorization, 'keyboardcat').email;
      
      const material = req.params.id;

      const annotation = await annotationFacade.find({email: useremail, materialid: material});

      const materialToReturn = await materialFacade.find({_id: material}).then(doc => {
        doc.annotation = annotation;
        res.status(200).json({error: false, userinfo: useremail, annotation: annotation[0].annotation, material: doc});
      });   
  } 
}

module.exports = new MaterialController(materialFacade);
