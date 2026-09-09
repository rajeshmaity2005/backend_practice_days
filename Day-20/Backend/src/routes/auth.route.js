const express = require('express')
// const { registerController, loginController } = require('../controllers/auth.controller')
const authController = require('../controllers/auth.controller')
const identifyUser = require("../middlewares/auth.middleware")


const authRouter = express()


// authRouter.post('/register', registerController)
authRouter.post('/register', authController.registerController)

// authRouter.post('/login', loginController)
authRouter.post('/login', authController.loginController)

/**
 * @route GET /api/auth/get-me
 * @description Get the currently logged in user's information
 * @access private
 */
authRouter.get("/get-me", identifyUser, authController.getMeController)



module.exports = authRouter