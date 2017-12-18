const Controller = require('../../lib/controller');
const threadFacade = require('./facade');
const userFacade = require("../user/facade");
const jwt = require('jsonwebtoken');

class ThreadController extends Controller {
  
    async createThread(req, res, next) {
        let threadDoc = await req.body;
        const decodedToken = jwt.verify(req.headers.authorization, 'keyboardcat');
        
        try {
            let thread = await threadFacade.findOne({title: req.body.title, category: req.body.category});
            let userDoc = await userFacade.findOneLogin({ email: decodedToken.email });

            if(thread) {
                threadFacade.updateThread(req, res, next);
            }
            else {
                thread = await threadFacade.create({
                    title: req.body.title,
                    posts: req.body.posts,
                    creator: userDoc._id,
                    category: req.body.category
                });

                return res.status(201).json(thread);
            }            
        } catch (e) {
            console.log(e);
            return next({message: 'Could not create thread.', statusCode: 400});
        }
    }
  


    async updateThread(req, res, next) {

        try {
            let threadDoc = await threadFacade.findOne({title: req.body.title, category: req.body.category});
            let threadPost = await req.body.posts[0];
            
            if(threadDoc) {
                threadDoc.posts.push(threadPost);
                await threadDoc.save();

                return res.status(200).json(threadDoc);
            }
            else {
                return next({message: 'Could not find thread.', statusCode: 400});
            }
        }
        catch (e) {
            console.log(e);
            return next({message: 'Could not update thread.', statusCode: 400});
        }
    }
  

    
    async getAllThreads (req, res, next) {
        try {
            let threads = await threadFacade.find();   
            return res.status(200).json(threads);
        } catch (e) {
            console.log(e);
            return next({message: 'Could not find threads.', statusCode: 400});
        }
    }
}

module.exports = new ThreadController(threadFacade);
