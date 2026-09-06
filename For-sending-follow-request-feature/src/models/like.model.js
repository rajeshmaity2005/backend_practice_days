const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.ObjectId,
        refs: 'posts',
        required: [true, 'Post is required']
    },
    user: {
        type: String,
        required: [true, 'User is required']
    },
}, {
    timestamps: true
})

likeSchema.index({ post: 1, user: 1 }, { unique: true })

const likeModel = mongoose.model('likes', likeSchema)

module.exports = likeModel