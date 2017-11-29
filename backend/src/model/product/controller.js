const Controller = require("../../lib/controller");
const productFacade = require("./facade");
const companyFacade = require("../company/facade");

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
      });
  }

  update(req, res, next) {
    let product;

    productFacade.findById(req.param("id")).then(doc => {
      product = doc;
      return materialFace.create(req,body);
    });
  }
}

module.exports = new ProductController(productFacade);
