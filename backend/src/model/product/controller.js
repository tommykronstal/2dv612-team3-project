const Controller = require('../../lib/controller')
const productFacade = require('./facade')
const companyFacade = require('../company/facade')
const materialFacade = require('../material/facade')
const annotationFacade = require('../annotation/facade')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Fuse = require('fuse.js')

class ProductController extends Controller {
  async findForCompany (req, res, next) {
    console.log('Find Product for Company')
    try {
      let doc = await companyFacade.findById(req.param('companyid'))
      if (doc) { return res.status(200).json(doc.products) }
    } catch (e) {
      console.log('Found an error')
      return next({message: 'Could not find company.', statusCode: 400})
    }
  }

  async create (req, res, next) {
    try {
      let company = await companyFacade.findById(req.param('companyid'))

      if (company) {
        let prodDoc = await productFacade.create(req.body)
        company.products.push(prodDoc)
        await company.save()

        return res.status(201).json(company.products)
      } else {
        return next({message: 'Could not find company.', statusCode: 400})
      }
    } catch (e) {
      console.log(e)
      return next({message: 'Could not create product.', statusCode: 400})
    }
  }

  async update (req, res, next) {
    try {
      let product = await productFacade.findById(req.param('id'))

      if (product) {
        const {
          originalname,
          size,
          filename,
          path,
          mimetype
        } = await req.file
        const name = await req.body.name

        let prodDoc = await materialFacade.create({
          originalname,
          size,
          name,
          path,
          filename,
          mimetype
        })

        product.materials.push(prodDoc)
        await product.save()

        return res.status(201).json(prodDoc)
      } else {
        return next({message: 'Could not find product.', statusCode: 400})
      }
    } catch (e) {
      console.log(e)
      return next({message: 'Failed to upload.', statusCode: 400})
    }
  }

  async findByIdIncludeCompany (req, res, next) {
    const useremail = await jwt.verify(req.headers.authorization, 'keyboardcat').email

    try {
      let doc = await productFacade.findById(req.param('id'))

      if (doc) {
        let product = await JSON.parse(JSON.stringify(doc))
        for (let i = 0; i < product.materials.length; i++) {
          let annotDoc = await annotationFacade.findOne({'email': res.locals.email, 'materialid': product.materials[i]._id})
          if (annotDoc) {
            product.materials[i].annotation = annotDoc.annotation
          }
        }

        doc = await companyFacade.findOne({'products': mongoose.Types.ObjectId(req.param('id')) })
        product.companyName = doc.companyName

        return res.status(200).json(product)
      } else {
        return next({message: 'Could not find product.', statusCode: 400})
      }
    } catch (e) {
      console.log(e)
      return next({message: 'Could not find product.', statusCode: 400})
    }
  }

  // Example: localhost:5000/api/search?q=philips TV 2
  async search (req, res, next) {
    try {
      const allProducts = await productFacade.findForSearch()

      const searchList = allProducts.reduce((result, product) => {
        product.searchKey = product.companyName + ' ' + product.name
        result.push(product)

        product.materials.forEach(material => result.push({
          _id: material._id,
          name: material.name,
          isMaterial: true,
          originalname: material.originalname,
          filename: material.filename,
          searchKey: material.name + ' ' + product.companyName + ' ' + product.name,
          productName: product.name,
          companyName: product.companyName
        }))

        return result
      }, [])

      const options = {
        shouldSort: true,
        findAllMatches: true,
        threshold: 0.6,
        location: 0,
        tokenize: true,
        matchAllTokens: true,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['searchKey'],
        includeScore: true,
        includeMatches: false
      }

      const fuse = new Fuse(searchList, options)

      const searchParam = req.param('q')

      console.log('q:', searchParam)

      const result = fuse.search(searchParam)

      return res.status(201).json(result)
    } catch (error) {
      console.error(error)
      return next({message: 'Search couldn\'t find any products', statusCode: 400})
    }
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
