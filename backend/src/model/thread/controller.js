const Controller = require('../../lib/controller')
const threadFacade = require('./facade')
const userFacade = require('../user/facade')
const postFacade = require('../post/facade')
const jwt = require('jsonwebtoken')

class ThreadController extends Controller {
  async createThread (req, res, next) {
    let threadDoc = await req.body
    const decodedToken = jwt.verify(req.headers.authorization, 'keyboardcat')

    try {
      let thread = await threadFacade.findOne({title: req.body.title, category: req.body.category})
      let userDoc = await userFacade.findOneLogin({ email: decodedToken.email })

      if (!thread) {
        thread = await threadFacade.create({
          title: req.body.title,
          posts: req.body.posts,
          creator: userDoc._id,
          category: req.body.category
        })

        return res.status(201).json(thread)
      } else { return next({message: 'Thread already exists.', statusCode: 400}) }
    } catch (e) {
      console.log(e)
      return next({message: 'Could not create thread.', statusCode: 400})
    }
  }

    /**
     * Updates an existing thread by adding a post to the thread posts
     * @param { threadid: the id of the thread, post: the post that is to be added } req
     * @param {*} res
     * @param {*} next
     */
  async createAnswer (req, res, next) {
    try {
      const decodedToken = jwt.verify(req.headers.authorization, 'keyboardcat')
      let threadDoc = await threadFacade.findById(req.param('id'))
      let userDoc = await userFacade.findOneLogin({ email: decodedToken.email })

      if (threadDoc) {
        let post = await postFacade.create({
          user: userDoc._id,
          text: req.body.text
        })
        threadDoc.posts.push(post)
        await threadDoc.save()

        return res.status(200).json(threadDoc)
      } else {
        return next({message: 'Could not find thread.', statusCode: 400})
      }
    } catch (e) {
      console.log(e)
      return next({message: 'Could not update thread.', statusCode: 400})
    }
  }

  async getAllThreads (req, res, next) {
    try {
      let threads = await threadFacade.find()

      const mappedThreads = threads.map(function (thread) {
        return {
          title: thread.title,
          category: thread.category,
          user: thread.creator,
          date: thread.date
        }
      })

      return res.status(200).json(mappedThreads)
    } catch (e) {
      console.log(e)
      return next({message: 'Could not find threads.', statusCode: 400})
    }
  }

  async getThreadWithPosts(req, res, next) {
    try {
      let thread = await threadFacade.findById(req.params.id, {__v: 0})
      let resThread = {_id: thread._id, title: thread.title, date: thread.date, category: thread.category};

      let threadUser = await userFacade.findById(thread.creator, 'email firstName lastName')
      resThread.user = threadUser

      let posts = []
      for(let i = 0; i < thread.posts.length; i++) {
        if(thread.posts[i] !== null) {
          let post = await postFacade.findById(thread.posts[i], {__v: 0, _id:0})
          let postUser = await userFacade.findById(post.user, 'email firstName lastName')
          post.user = postUser;
          posts.push(post);
        }
      }
      resThread.posts = posts;
      return res.status(200).json(resThread);
    }
    catch(e) {
      console.log(e)
      return next({message: 'Could not find thread.', statusCode: 400})
    }
  }

  async findForUser (req, res, next) {
    try {
      const decodedToken = jwt.verify(req.headers.authorization, 'keyboardcat')
      let userDoc = await userFacade.findOneLogin({ email: decodedToken.email })
      let response = {created: [], posted: []}

      let threads = await threadFacade.find({creator: userDoc._id}, '_id title creator category date')
      response.created = threads

      let posts = await postFacade.find({user: userDoc._id})
      for (let i = 0; i < posts.length; i++) {
        let thread = await threadFacade.findOne({posts: posts[i]._id}, '_id title creator category date')
        if (thread) {
          response.posted.push(thread)
        }
      }
      return res.status(200).json(response)
    } catch (e) {
      console.log(e)
      return next({message: 'Could not get threads for user.', statusCode: 400})
    }
  }
}

module.exports = new ThreadController(threadFacade)
