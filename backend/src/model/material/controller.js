const Controller = require('../../lib/controller');
const materialFacade = require('./facade');
const jwt = require('jsonwebtoken');

class MaterialController extends Controller {

  async createAnnotation(req, res, next) {
    
    const annotation = req.body.annotation;
    const useremail = jwt.verify(req.headers.authorization, 'keyboardcat').email;
    const material = req.params.id;

    res.status(201).json({error: false, annotation: annotation, user: useremail, material: material});

  }


  async getAnnotation(req, res, next) {
      const useremail = jwt.verify(req.headers.authorization, 'keyboardcat').email;
      const annotation = "Will be read from db";
      const material = req.params.id;

      res.status(200).json({error: false, userinfo: useremail, annotation: annotation, material: material});
  } 


}

module.exports = new MaterialController(materialFacade);
