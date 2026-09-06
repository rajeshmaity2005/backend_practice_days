const express = require('express');
const userController = require('../controllers/user.controller');
const identifyUser = require('../middlewares/auth.middleware');

const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:userId
 * @description follow a user by id
 * @access private
 */
userRouter.post('/follow/:username', identifyUser, userController.followRequestController)

/**
 * @route GET /api/users/follow-requests
 * @description get all follow requests for the logged in user
 * @access private
 */
userRouter.get('/follow-requests', identifyUser, userController.getPendingRequestsController)

/**
 * @route PATCH /api/users/follow-requests/:requestId/accept
 * @description accept a follow request by id
 * @access private
 */
userRouter.patch('/follow-requests/:requestId/accept', identifyUser, userController.acceptFollowRequestController)

/**
 * @route PATCH /api/users/follow-requests/:requestId/reject
 * @description reject a follow request by id
 * @access private
 */
userRouter.patch('/follow-requests/:requestId/reject', identifyUser, userController.rejectFollowRequestController)

/**
 * @route POST /api/users/follow/:userId
 * @description follow a user by id
 * @access private
 */
userRouter.post('/unfollow/:username', identifyUser, userController.unfollowUserController)



module.exports = userRouter;