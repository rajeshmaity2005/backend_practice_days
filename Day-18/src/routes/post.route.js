const express = require('express')
const postController = require('../controllers/post.controller')
const postRouter = express.Router()
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require('../middlewares/auth.middleware')


/**
 * @route POST /api/posts [protected]
 * @description create a post with image and text, the image will be uploaded to cloudinary and the url will be saved to the database
 */
postRouter.post('/', upload.single('image'), identifyUser, postController.createPostController)


/**
 * @route GET /api/posts/ [protected]
 * @description get all posts
 */
postRouter.get('/', identifyUser, postController.getPostController)


/**
 * @route GET /api/posts/details/:postId
 * @description return a detail about specific post with the id, also check whether the post belong to the user that is request come from
 */
postRouter.get('/details/:postId', identifyUser, postController.getPostDetailsController)


/**
 * @route POST /api/posts/like/:postId
 * @description like a post with the postId
 */
postRouter.post('/like/:postId', identifyUser, postController.likePostController)




module.exports = postRouter 