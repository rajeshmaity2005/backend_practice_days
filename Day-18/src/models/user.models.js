const { default: mongoose } = require('mongoose')
const monggose = require('mongoose')

const userSchema = new monggose.Schema({
    username: {
        type: String,
        unique: [true, 'Username Already Exists'],
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        unique: [true, 'Email Already Exists'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    bio:String,
    profileImage:{
        type:String,
        default: 'https://ik.imagekit.io/qwertasdfzxcv/default-image_f_y2x7IIR.jpg'
    }
})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel