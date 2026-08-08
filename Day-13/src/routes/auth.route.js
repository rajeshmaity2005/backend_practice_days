const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')


const authRouter = express.Router()

// Have to use /api/auth/register
authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })

    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"User Already Exist."
        })
    }

    const user = await userModel.create({
        name, email, password
    })

    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token',token)

    res.status(201).json({
        message: "User registered successfully.",
        user,
        token
    })
})



module.exports = authRouter