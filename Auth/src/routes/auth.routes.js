const express = require('express')
const userModel = require('../models/user.model')
const authRouter = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

// For registering User
// POST /api/auth/register
authRouter.post('/register', async (req, res) => {
    const { email, name, password } = req.body

    const isUserExist = await userModel.findOne({ email })

    if (isUserExist) {
        return res.status(409).json({
            message: "User already exist."
        })
    }

    const hash = crypto.createHash('Md5').update(password).digest('hex')

    const user = await userModel.create({
        name,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.cookie('token', token)

    res.status(201).json({
        message: "User Registered Successfully.",
        user: {
            name: user.name,
            email: user.email
        }
    })
})

authRouter.get('/get-me', async (req, res) => {
    const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // console.log(decoded.id);

    const user = await userModel.findById(decoded.id)

    res.json({
        name: user.name,
        email: user.email
    })

})

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "User not found."
        })
    }

    const hash = crypto.createHash('Md5').update(password).digest('hex')

    const isPasswordValid = hash === user.password

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password."
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: '1hr' })

    res.cookie('token', token)

    res.json({
        message: "User logged in successfully.",
        user: {
            name: user.name,
            email: user.email
        }
    })
})



module.exports = authRouter