const userModel = require('../models/user.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function registerController(req, res) {
    const { email, username, password, bio, profileImage } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: 'User already exists' + (isUserAlreadyExists.email == email ? "Email already exists" : "Username already exists")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        email,
        username,
        password: hash,
        bio,
        profileImage
    })

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('token', token)

    res.status(201).json({
        message: 'User created successfully',
        user: {
            username: newUser.username,
            email: newUser.email,
            bio: newUser.bio,
            profileImage: newUser.profileImage
        }
    })

}

async function loginController(req, res) {
    const { email, username, password } = req.body

    const user = await userModel.findOne({
        $or: [
            {
                // username
                username: username
            },
            {
                // email
                email: email
            }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(404).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie('token', token)


    res.status(200).json({
        message: "Logged in successfully",
        user: {
            username: user.name,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


module.exports = {
    registerController,
    loginController
}