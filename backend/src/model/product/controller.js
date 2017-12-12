const Controller = require("../../lib/controller");
const productFacade = require("./facade");
const companyFacade = require("../company/facade");
const materialFacade = require("../material/facade");
const annotationFacade = require("../annotation/facade");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

class ProductController extends Controller {
  findForCompany(req, res, next) {
    companyFacade.findById(req.param("companyid")).then(doc => {
      res.status(200).json(doc.products);
    });
  }

  create(req, res, next) {
    let company;

    companyFacade
      .findById(req.param("companyid"))
      .then(compDoc => {
        company = compDoc;
        return productFacade.create(req.body);
      })
      .then(prodDoc => {
        company.products.push(prodDoc);
        return company.save();
      })
      .then(compDoc => {
        res.status(201).json(compDoc.products);
      })
      .catch((e) => { return next({message: 'Could not create product.', statusCode: 400}) });
  }

  update(req, res, next) {
    let product;

    const {
      originalname, size, filename, path, mimetype
    } = req.file;
    const name = req.body.name;

    productFacade
      .findById(req.param("id"))
      .then(doc => {
        product = doc;
        return materialFacade.create({
          originalname, size, name, path, filename, mimetype
        });
      })
      .then(materialDoc => {
        product.materials.push(materialDoc);
        return product.save();
      })
      .then(prodDoc => {
        res.status(201).json(prodDoc);
      })
      .catch((e) => { return next({message: 'Failed to upload.', statusCode: 400}) });
  }

  findByIdIncludeCompany(req,res,next){
    const useremail = jwt.verify(req.headers.authorization, 'keyboardcat').email;
    let product;
    productFacade.findById(req.param('id')).then((doc) => {
      product = JSON.parse(JSON.stringify(doc));
      for(let i = 0; i < product.materials.length; i++) {
        annotationFacade.findOne({'email': useremail, 'materialid': product.materials[i]._id}).then((annotDoc) => {
          if(annotDoc) {
            product.materials[i].annotation = annotDoc.annotation;
          }
        });
      }
    })
    .then((doc) => {
        return companyFacade.findOne({'products': mongoose.Types.ObjectId(req.param('id')) })
        .then((doc)=>{
          product.companyName = doc.companyName;
          res.status(200).json(product);
        })
    })
    .catch((e) => { return next({message: 'Could not find product' , statusCode: 400}) });
   }
}


module.exports = new ProductController(productFacade);
