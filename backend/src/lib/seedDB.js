const userFacade = require('../model/user/facade')
const companyFacade = require('../model/company/facade')
const categoryFacade = require('../model/category/facade')
const productFacade = require('../model/product/facade')
const materialFacde = require('../model/material/facade')
let carModels = require('./seed/MOCK_DATA.json')

exports.admin = function (adminAccount) {
  userFacade
    .findOne({
      firstName: adminAccount.firstName
    })
    .then(doc => {
      if (!doc) {
        userFacade
          .create(adminAccount)
          .then(doc => {})
          .catch(e => console.log(e))
      }
    })
    .catch(e => console.log(e))
}

const seed = async function (seedSettings) {
  const companyDocs = await companyFacade.find({})
  if (companyDocs.length === 0) {
    await createCompanies(seedSettings)
    await createReps(seedSettings)
    // await createUsers(100)
    // await createCategorys(companies)
    // await createProducts(companies)
    // await createMaterial(companies)
    // await createRatings()
  }
}

const createCompanies = async function (companies) {
  const cmp = await Promise.all(companies.map(async function (company) {
    const adminDoc = await userFacade
      .create({
        firstName: `FN${company.name}Admin`,
        lastName: `LN${company.name}Admin`,
        email: `admin@${company.name.toLowerCase()}.com`,
        role: 'COMPANY_ADMIN',
        password: 'password'
      })
    const companyDoc = await companyFacade
      .create({
        companyName: company.name,
        admin: adminDoc._id
      })
    return companyDoc
  }))
  return cmp
}

const createReps = async function (companies) {
  //const companyDocs = await companyFacade.find({})
}

exports.companies = async function (companies) {
  const companyDocs = await companyFacade.find({})
  if (companyDocs.length === 0) {
    seed(companies)
  }
}

exports.users = function (number) {
  userFacade.find({}).then(docs => {
    if (docs.length < 10) {
      let i
      for (i = 0; i < number; i++) {
        const user = {
          firstName: `FNuser${i}`,
          lastName: `LNuser`,
          email: `user${i}@user.com`,
          role: 'USER',
          password: 'password'
        }
        userFacade.create(user)
      }
    }
  })
}

const createMaterial = () => {
  const materialNames = ['Manual', 'Quickstart', 'Safety Brochure']
  const materialPromises = []
  let products = []
  productFacade.find().then((docs) => {
    products = docs
    for (var i = 0; i < docs.length; i++) {
      const material = {
        name: materialNames[Math.floor((Math.random() * 3))],
        originalname: 'components.pdf',
        filename: 'e506a9172af9259843342dc44c58f763',
        path: 'src/lib/seed/e506a9172af9259843342dc44c58f763',
        size: 33600,
        mimetype: 'application/pdf'
      }
      materialPromises.push(materialFacde.create(material))
    }
    return Promise.all(materialPromises)
  }).then((matDocs) => {
    for (let i = 0; i < products.length; i++) {
      products[i].materials.push(matDocs[i])
      products[i].save()
    }
  })
}

const createCompany = company => {
  return new Promise(function (resolve, reject) {
    var mongoCompany
    const admin = {
      firstName: `FN${company.name}Admin`,
      lastName: `LN${company.name}Admin`,
      email: `admin@${company.name.toLowerCase()}.com`,
      role: 'COMPANY_ADMIN',
      password: 'password'
    }

    // Create admin
    userFacade
      .create(admin)
      .then(adminDoc => {
        // Create company
        return companyFacade.create({
          companyName: company.name,
          admin: adminDoc._id
        })
      })
      .then(companyDoc => {
        // Create reps
        mongoCompany = companyDoc
        return createCompanyReps(company)
      })
      .then(reps => {
        mongoCompany.reps = reps
        return mongoCompany.save()
      })
      .then(() => createProducts(company))
      .then(products => {
        mongoCompany.products = products
        return mongoCompany.save()
      })
      .then(doc => {
        return resolve(doc)
      })
      .catch(e => reject(e))
  })
}

const createCompanyReps = company => {
  return new Promise(function (resolve, reject) {
    const promises = []
    for (let i = 0; i < company.reps; i++) {
      const companyRep = {
        firstName: `FN${company.name}Rep${i}`,
        lastName: `LN${company.name}${i}Rep`,
        email: `rep${i}@${company.name.toLowerCase()}.com`,
        role: 'COMPANY_REP',
        password: 'password'
      }

      promises.push(userFacade.create(companyRep))
    }
    Promise.all(promises)
      .then(docs => {
        return resolve(docs)
      })
      .catch(e => reject(e))
  })
}

const createProducts = company => {
  return new Promise(function (resolve, reject) {
    const prodArr = []
    const categoryPromises = []

    for (let i = 0; i < company.categories.length; i++) {
      // get category
      categoryPromises.push(categoryFacade
        .findOne({
          categoryName: company.categories[i]
        }))
    }
    Promise.all(categoryPromises)
      .then(categorys => {
        for (let i = 0; i < categorys.length; i++) {
          for (j = 0; j < company.productsPerCategory; j++) {
            prodArr.push(
              productFacade.create({
                name: carModels.shift().productname,
                companyName: company.name,
                category: categorys[i]._id
              })
            )
          }
        }
        return prodArr
      })
      .then(arrDoc => {
        Promise.all(arrDoc)
          .then(docs => {
            return resolve(docs)
          })
          .catch(e => reject(e))
      })
  })
}

const createCategory = category => {
  categoryFacade.create({
    categoryName: category
  })
}