const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()
const crypto = require('crypto')



// Have to use /api/auth/register
authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User Already Exist."
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        name, email, password: hash
    })

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token', token)

    res.status(201).json({
        message: "User registered successfully.",
        user,
        token
    })
})


// /api/auth/protected
authRouter.post('/protected', async (req, res) => {
    console.log('This is a protected route.');

    res.status(200).json({
        message: "This is a protected route.",

    })
})

// Controller
// /api/auth/login
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "User not found with this email address."
        })
    }

    const isPasswordMatched = await user.password === password

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "Logged in Successfully."
    })
})


module.exports = authRouter