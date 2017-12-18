const userFacade = require('../model/user/facade')
const companyFacade = require('../model/company/facade')
const categoryFacade = require('../model/category/facade')
const productFacade = require('../model/product/facade')
const materialFacde = require('../model/material/facade')
const threadFacade = require('../model/thread/facade')
const postFacade = require('../model/post/facade')
let carModels = require('./seed/MOCK_DATA.json')
const seedConfig = require('../config')

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

exports.companies = async function (companies) {
  const companyDocs = await companyFacade.find({})
  if (companyDocs.length === 0) {
    seed(companies)
  } else {
    console.log('db already seeded')
  }
}

const seed = async function (seedSettings) {
  console.log('seeding database..');
  // Creates the companies from seedSeetings
  const companyDocs = await createCompanies(seedSettings)
  // Create on rep for each company
  await createReps(companyDocs)
  // Creates categories used by all companies
  await createCategories(seedSettings)
  // Create products for all companies
  await createProducts(seedSettings, companyDocs)
  // Creates one material for each product
  await createMaterial()

  await createPosts(seedConfig.posts)

  await createThreads(seedConfig.threads)

  console.log('database seed complete')



  // Already done from index
  // await createUsers(100)
  //
  // Not done yet...
  // await createRatings()
  //
  // Not done yet...
  // await create thread()
}

const createCompanies = async function (seedSettings) {
  const cmp = await Promise.all(seedSettings.map(async function (company) {
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

const createReps = async function (companyDocs) {
  const cmps = await Promise.all(companyDocs.map(async function (company) {
    const repDoc = await userFacade
      .create({
        firstName: `FN${company.companyName}Rep`,
        lastName: `LN${company.companyName}Rep`,
        email: `rep@${company.companyName.toLowerCase()}.com`,
        role: 'COMPANY_REP',
        password: 'password'
      })
    company.reps.push(repDoc)
    const companyDoc = await company.save()
    return companyDoc
  }))
  return cmps
}

const createCategories = async function (seedSettings) {
  const categories = Array.from(new Set([].concat.apply([], seedSettings.map(company => company.categories))))
  const categoryDocs = await Promise.all(categories.map(async function (category) {
    const cat = await categoryFacade.create({
      categoryName: category
    })
    return cat
  }))
  return categoryDocs
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

const createProducts = async function (seedSettings, companyDocs) {
  const companies = await Promise.all(companyDocs.map(async function (company) {
    const companySettings = seedSettings.find(function (companySetting) {
      return companySetting.name === company.companyName
    })
    console.log(companySettings)
    const prods = await createProductsForCompany(companySettings)
    company.products = prods
    const cmp = company.save()
    return cmp
  }))
  return companies
}

const createProductsForCompany = company => {
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

const createThreads = async (threads) => {
  const userDocs = await userFacade.find({})
  const categories = await categoryFacade.find({})
  const posts = await postFacade.find({})

  for (let t = 0; t < categories.length * 10; t++) { // duplicate the threads by 10

    for (let i = 0; i < threads.length; i++) {
      let randPosts = [];
      for (let y = 0; y < t; y++) randPosts.push(posts[Math.floor(Math.random() * posts.length)])

      threadFacade.create({
        question: `${threads[i].question} thread ${t} . ${i}`, //since questions are unique
        creator: userDocs[Math.floor(Math.random() * userDocs.length - 1) + 1],
        category: categories[Math.floor(Math.random() * categories.length)],
        posts: randPosts
      })
    }
  }
}

const createPosts = async (posts) => {
  const userDocs = await userFacade.find({})

  for (let p = 0; p < posts.length * 10; p++) { // duplicate the posts by 10
    for (let i = 0; i < posts.length; i++) {
      postFacade.create({
        text: posts[i].text,
        user: userDocs[Math.floor(Math.random() * userDocs.length - 1) + 1], //to skip the admin user who is 0 in array
      })
    }
  }


}