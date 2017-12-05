class Controller {
  constructor(facade) {
    this.facade = facade;
  }

  create(req, res, next) {
    this.facade.create(req.body)
      .then(doc => res.status(201).json(doc))
      .catch(err => next({message: "Error during create.", statusCode: 500}));
  }

  find(req, res, next) {
    return this.facade.find(req.query, {password: 0, __v: 0})
      .then(collection => res.status(200).json(collection))
      .catch(err => next({message: "Error during find.", statusCode: 500}));
  }

  findOne(req, res, next) {
    return this.facade.findOne(req.query, {password: 0, __v: 0})
      .then(doc => res.status(200).json(doc))
      .catch(err => next({message: "Error during findOne.", statusCode: 500}));
  }

  findById(req, res, next) {
    return this.facade.findById(req.params.id, {password: 0, __v: 0})
      .then((doc) => {
        if (!doc) { return res.sendStatus(404); }
        return res.status(200).json(doc);
      })
      .catch(err => next({message: "Error during findById.", statusCode: 500}));
  }

  update(req, res, next) {
    this.facade.update({ _id: req.params.id }, req.body)
      .then((results) => {
        if (results.n < 1) { return res.sendStatus(404); }
        if (results.nModified < 1) { return res.sendStatus(304); }
        res.sendStatus(204);
      })
      .catch(err => next({message: "Error during update.", statusCode: 500}));
  }

  remove(req, res, next) {
    this.facade.remove({ _id: req.params.id })
      .then((doc) => {
        if (!doc) { return res.sendStatus(404); }
        return res.sendStatus(204);
      })
      .catch(err => next({message: "Error during remove", statusCode: 500}));
  }
}

module.exports = Controller;
