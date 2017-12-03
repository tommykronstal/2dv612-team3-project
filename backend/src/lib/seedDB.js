const userFacade = require("../model/user/facade");
const companyFacade = require("../model/company/facade");

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
      products: 100,
      materialsPerProduct: 3
    },
    {
      name: "Samsung",
      reps: 2,
      products: 50,
      materialsPerProduct: 2
    }
  ];

  companies.map(company => createCompany(company));
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
};

createCompanyReps = company => {
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
