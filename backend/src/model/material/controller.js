const Controller = require('../../lib/controller');
const materialFacade = require('./facade');

class MaterialController extends Controller {

  async createAnnotation(req, res, next) {
    const {
      annotation
    } = req.body;

    res.status(201).json({error: false, message: annotation});

    /*
    try {
      const newUser = await userFacade.createUser(user); // returns an array on succ. if email is not unique i.e. user already exists execution will catch here
      const companyExists = await companyFacade.find({name: company.companyName})[0]; // todo no unique identifier for companies in schema so have to find first?
      if (companyExists) return next({message: 'Company already exists', statusCode: 400});
      company.admin = newUser;
      await companyFacade.create(company);
      return res.status(201).json({ error: false });
    } catch (e) {
      return next(e);
    }*/
  }


}

module.exports = new MaterialController(materialFacade);
