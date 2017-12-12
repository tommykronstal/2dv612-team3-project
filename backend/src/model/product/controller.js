const Controller = require("../../lib/controller");
const productFacade = require("./facade");
const companyFacade = require("../company/facade");
const materialFacade = require("../material/facade");
const annotationFacade = require("../annotation/facade");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Fuse = require('fuse.js')

class ProductController extends Controller {
  findForCompany (req, res, next) {
    companyFacade.findById(req.param('companyid')).then(doc => {
      res.status(200).json(doc.products)
    })
  }


  async create (req, res, next) {
    let company;
    let prodDoc;

    try {
      company = await companyFacade.findById(req.param('companyid'));
      
      if(company) {
        prodDoc = await productFacade.create(req.body);
        company.products.push(prodDoc);
        await company.save();
        return res.status(201).json(company.products);
      }
      else {
        return next({message: 'Could not find company.', statusCode: 400});
      }

    } catch (e) {
      console.log(e);
      return next({message: 'Could not create product.', statusCode: 400});
    }
  }


  async update(req, res, next) {
    let product;
    let prodDoc;

    try {
      product = await productFacade.findById(req.param('id'));

      if(product) {
        const {
          originalname,
          size,
          filename,
          path,
          mimetype
        } = await req.file;
        const name = await req.body.name;

        prodDoc = await materialFacade.create({
          originalname,
          size,
          name,
          path,
          filename,
          mimetype
        });

        product.materials.push(prodDoc);
        await product.save();
        return res.status(201).json(prodDoc);
      }
      else {
        return next({message: 'Could not find product.', statusCode: 400});
      }

    } catch (e) {
      console.log(e);
      return next({message: 'Failed to upload.', statusCode: 400});
    }
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

  // Example: localhost:5000/api/search?q=philips TV 2
  async search (req, res, next) {
    const allProducts = await productFacade.findForSearch()
    const options = {
      shouldSort: true,
      findAllMatches: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'name',
        'materials.name'
      ],
      includeScore: true,
      includeMatches: true
    }
    const fuse = new Fuse(allProducts, options)
    const result = fuse.search(req.param('q'))
    const filterdResult = removeUnmatchedSearchResults(result)
    return res.status(201).json(filterdResult)
  }
}

const removeUnmatchedSearchResults = (result) => {
  let i
  for (i = 0; i < result.length; i++) {
    const elementsToSave = []
    for (let j = 0; j < result[i].matches.length; j++) {
      elementsToSave.push(result[i].item.materials[result[i].matches[j].arrayIndex])
      result[i].matches[j].arrayIndex = j
    }
    result[i].item.materials = elementsToSave
  }
  return result
}

module.exports = new ProductController(productFacade)



/* Old code, keep in case shit */


/*
  create (req, res, next) {
    let company

    companyFacade
      .findById(req.param('companyid'))
      .then(compDoc => {
        company = compDoc
        req.body.companyName = company.companyName
        return productFacade.create(req.body)
      })
      .then(prodDoc => {
        company.products.push(prodDoc)
        return company.save()
      })
      .then(compDoc => {
        res.status(201).json(compDoc.products)
      })
      .catch((e) => {
        return next({
          message: 'Could not create product.',
          statusCode: 400
        })
      })
  }

  

  update (req, res, next) {
    let product

    const {
      originalname,
      size,
      filename,
      path,
      mimetype
    } = req.file
    const name = req.body.name

    productFacade
      .findById(req.param('id'))
      .then(doc => {
        product = doc
        return materialFacade.create({
          originalname,
          size,
          name,
          path,
          filename,
          mimetype
        })
      })
      .then(materialDoc => {
        product.materials.push(materialDoc)
        return product.save()
      })
      .then(prodDoc => {
        res.status(201).json(prodDoc)
      })
      .catch((e) => {
        return next({
          message: 'Failed to upload.',
          statusCode: 400
        })
      })
  }
  */