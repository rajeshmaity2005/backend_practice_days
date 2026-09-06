const express = require('express')
// const { registerController, loginController } = require('../controllers/auth.controller')
const authController = require('../controllers/auth.controller')


const authRouter = express()

/**
 * @route POST /api/auth/register
 * @description register a new user
 * @access public
 */
// authRouter.post('/register', registerController)
authRouter.post('/register', authController.registerController)


/**
 * @route POST /api/auth/login
 * @description login a user
 * @access public
 */
// authRouter.post('/login', loginController)
authRouter.post('/login', authController.loginController)

module.exports = authRouter