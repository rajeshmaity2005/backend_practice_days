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
    }
}, {
    timestamps: true
})

followSchema.index({ follower: 1, followee: 1 }, { unique: true })

const followModel = mongoose.model('follows', followSchema)

module.exports = followModel