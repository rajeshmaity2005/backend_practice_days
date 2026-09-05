const express = require('express')
// const { registerController, loginController } = require('../controllers/auth.controller')
const authController = require('../controllers/auth.controller')


const authRouter = express()


// authRouter.post('/register', registerController)
authRouter.post('/register', authController.registerController)

// authRouter.post('/login', loginController)
authRouter.post('/login', authController.loginController)

module.exports = authRouter