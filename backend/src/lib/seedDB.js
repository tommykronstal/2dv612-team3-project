const userFacade = require("../model/user/facade");
const companyFacade = require("../model/company/facade");
const categoryFacade = require("../model/category/facade");

exports.admin = function(adminAccount) {
  userFacade
    .findOne({ firstName: adminAccount.firstName })
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

const companies = ["Philips", "Samsung", "Cresent"];

exports.companies = function(companies) {
  companies = [
    {
      name: "Philips",
      reps: 3,
      productsPerCategory: 30,
      categories: ['TV', 'VCR'],
      materialsPerProduct: 3
    },
    {
      name: "Samsung",
      reps: 2,
      productsPerCategory: 50,
      categories: ['TV', 'VCR', 'Mobile Phone'],
      materialsPerProduct: 2
    }
  ];
  
  // Get all unique categories
  const categories = Array.from(new Set([].concat.apply([], companies.map(company => company.categories))))
  // Create categories
  categories.map(x => createCategory(x));
  // Create companies and with products and material
  companies.map(x => createCompany(x));
};

const createCompany = company => {
  var mongoCompany;
  const admin = {
    firstName: `FN${company.name}Admin`,
    lastName: `LN${company.name}Admin`,
    email: `admin@${company.name}.com`,
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
    }).then((reps) => {
      mongoCompany.reps = reps;
      return mongoCompany.save();
    })
    .then(() => createProducts(company))
    //.then(products => mongoCompany.companies = companies)
    
};

const createCompanyReps = company => {
  return new Promise(function(resolve, reject) {
    const promises = [];
    for (let i = 0; i < company.reps; i++) {
      const companyRep = {
        firstName: `FN${company.name}Rep${i}`,
        lastName: `LN${company.name}${i}Rep`,
        email: `Rep${i}@${company.name}.com`,
        role: "COMPANY_REP",
        password: "password"
      };

      promises.push(userFacade.create(companyRep));
    }
    Promise.all(promises).then(docs => {
      return resolve(docs);
    }).catch(e => reject(e));
  });
};

const createProducts = company => {
    console.log('----------------------------\nthis is where we create products\n----------------------------')
    //company.category.map((company) => createProductsForCategory(company))
};

const createCategory = (category) => {
    categoryFacade.create({'categoryName': category})
}

const createProductsForCategory = () => {

}