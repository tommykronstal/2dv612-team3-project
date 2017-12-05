const userFacade = require("../model/user/facade");
const companyFacade = require("../model/company/facade");
const categoryFacade = require("../model/category/facade");
const productFacade = require("../model/product/facade");
const materialFacde = require("../model/material/facade");

exports.admin = function(adminAccount) {
  userFacade
    .findOne({
      firstName: adminAccount.firstName
    })
    .then(doc => {
      if (!doc) {
        userFacade
          .create(adminAccount)
          .then(doc => {
            console.log("Added admin", doc);
          })
          .catch(e => console.log(e));
      }
    })
    .catch(e => console.log(e));
};

exports.companies = function(companies) {
  companyFacade.find({}).then(docs => {
    if (docs.length == 0) {
      // Get all unique categories
      const categories = Array.from(new Set([].concat.apply([], companies.map(company => company.categories))));
      // Create categories
      categories.map(x => createCategory(x));
      // Create companies
      companies.map(x => createCompany(x));
    }
  });
};

exports.users = function(number) {
  userFacade.find({}).then(docs => {  
    if(docs.length < 10){
      let i;
      for (i = 0; i < number; i++) {
        const user = {
          firstName: `FNuser${i}`,
          lastName: `LNuser`,
          email: `user${i}@user.com`,
          role: "USER",
          password: "password"
        };
        userFacade.create(user);
    }    
  }
})
}


const createCompany = company => {
  console.log(company);
  var mongoCompany;
  const admin = {
    firstName: `FN${company.name}Admin`,
    lastName: `LN${company.name}Admin`,
    email: `admin@${company.name.toLowerCase()}.com`,
    role: "COMPANY_ADMIN",
    password: "password"
  };

  //Create admin
  userFacade
    .create(admin)
    .then(adminDoc => {
      //Create company
      return companyFacade.create({
        companyName: company.name,
        admin: adminDoc._id
      });
    })
    .then(companyDoc => {
      //Create reps
      mongoCompany = companyDoc;
      return createCompanyReps(company);
    })
    .then(reps => {
      mongoCompany.reps = reps;
      return mongoCompany.save();
    })
    .then(() => createProducts(company))
    .then(products => {
      mongoCompany.products = products;
      mongoCompany.save();
    });
};

const createCompanyReps = company => {
  return new Promise(function(resolve, reject) {
    const promises = [];
    for (let i = 0; i < company.reps; i++) {
      const companyRep = {
        firstName: `FN${company.name}Rep${i}`,
        lastName: `LN${company.name}${i}Rep`,
        email: `rep${i}@${company.name.toLowerCase()}.com`,
        role: "COMPANY_REP",
        password: "password"
      };

      promises.push(userFacade.create(companyRep));
    }
    Promise.all(promises)
      .then(docs => {
        return resolve(docs);
      })
      .catch(e => reject(e));
  });
};

const createProducts = company => {
  return new Promise(function(resolve, reject) {
    const prodArr = [];
    var i;

    const material = {
      name: "manual",
      originalname: "components.pdf",
      filename: "e506a9172af9259843342dc44c58f763",
      path: "src/filesystem/uploads/e506a9172af9259843342dc44c58f763",
      size: 33600,
      mimetype: "e506a9172af9259843342dc44c58f763"
    };

    materialFacde.create(material).then(materialDoc => {
      for (i = 0; i < company.categories.length; i++) {
        // get category
        categoryFacade
          .findOne({ categoryName: company.categories[i] })
          .then(category => {
            for (j = 0; j < company.productsPerCategory; j++) {
              prodArr.push(
                productFacade.create({
                  name: company.name + " " + category.categoryName + " " + j,
                  category: category._id,
                  materials: [materialDoc.id]
                })
              );
            }
            return prodArr;
          })
          .then(arrDoc => {
            Promise.all(arrDoc)
              .then(docs => {
                return resolve(docs);
              })
              .catch(e => reject(e));
          });
      }
    });
  });
};

const createCategory = category => {
  categoryFacade.create({
    categoryName: category
  });
};
