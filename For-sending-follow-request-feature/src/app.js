const express = require('express')
const cookiesParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookiesParser())

/**require routes */
const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')
const userRouter = require('./routes/user.routes')

/**using routes */
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)

module.exports = app