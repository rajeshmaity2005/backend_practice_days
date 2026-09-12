const express = require('express')
const cookiesParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cookiesParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

/**require routes */
const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')
const userRouter = require('./routes/user.routes')

/**using routes */
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)

module.exports = app