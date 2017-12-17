const Controller = require('../../lib/controller');
const threadFacade = require('./facade');
const categoryFacade = require("../category/facade");
const userFacade = require("../user/facade");
const jwt = require('jsonwebtoken');

const minTitleLength = 10;
const maxTitleLength = 140;


class threadController extends Controller {

    async findAll(req, res, next) {

    }


    async findForCategory(req, res, next) {
        categoryFacade.findById(req.param("categoryid")).then(doc => {
            res.status(200).json(doc.thread);
        })
        .catch((e) => {return next({message: 'Could not find category.', statusCode: 400})});
    }


    async createThread(req, res, next) {
        //Some error handling
        if(req.body.title < minTitleLength)
            return next ({message: 'Title cannot be shorter than 10 ' + minTitleLength, statusCode: 400});
        if(req.body.title > maxTitleLength)
            return next ({message: 'Title cannot be longer than ' + maxTitleLength, statusCode: 400});

        const decodedToken = jwt.verify(req.headers.authorization, 'keyboardcat');
        const categoryid = req.param("categoryid");

        try {
            let userDoc = await userFacade.findOneLogin({ email: decodedToken.email });
            let category = await categoryFacade.findById(categoryid);

            if(category) {
                let thread = await threadFacade.create({
                    categoryid: categoryid,
                    title: req.body.title,
                    question: req.body.question,
                    posts: req.body.posts,
                    date: Date.now
                })
            }
            else
                return next ({message: 'Could not find category.', statusCode: 400});

            return res.status(201).json(thread);
        } catch (e) {
            console.log(e);
            return next({message: 'Could not create thread.', statusCode: 400});
        }
    }


    async findForUser(req, res, next) {

    }
}

module.exports = new threadController(threadFacade);