const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower: {
        // type: mongoose.Schema.ObjectId,
        // ref: 'User',
        // required: [true, 'Follower is required']
        type: String
    },
    followee: {
        // type: mongoose.Schema.ObjectId,
        // ref: 'User',
        // required: [true, 'Followee is required']
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
})

const followModel = mongoose.model('follows-request', followSchema)

module.exports = followModel