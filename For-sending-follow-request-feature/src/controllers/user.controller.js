const followModel = require('../models/follow.model')
const userModel = require('../models/user.models')

async function followRequestController(req, res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself."
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: `User with username ${followeeUsername} does not exist.`
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: `You are already following ${followeeUsername}`
        })
    }

    const followRequestRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `Follow request sent to ${followeeUsername}`,
        follow: followRequestRecord
    })
}

async function getPendingRequestsController(req, res) {
    
    const username = req.user.username

    const followRequests = await followModel.find({
        followee: username,
        status: 'pending'
    })

    res.status(200).json({
        message: `Follow requests for ${username}`,
        requests: followRequests,
    })
}

const acceptFollowRequestController = async (req, res) => {
    const followRequest = await followModel.findOne({
        _id: req.params.requestId,
        followee: req.user.username,
        status: 'pending'
    })

    if (!followRequest) {
        return res.status(404).json({
            message: 'Follow request not found.'
        })
    }

    followRequest.status = 'accepted'
    await followRequest.save()

    res.status(200).json({
        message: 'Follow request accepted.',
        followRequest
    })
}

const rejectFollowRequestController = async (req, res) => {
    const followRequest = await followModel.findOne({
        _id: req.params.requestId,
        followee: req.user.username,
        status: "pending"
    })

    if(!followRequest){
        res.status(404).json({
            message:"Follow request not found."
        })
    }

    followRequest.status = 'rejected'
    await followRequest.save()

    res.status(200).json({
        message:"Follow request rejected.",
        followRequest
    })

}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}

module.exports = {
    followRequestController,
    getPendingRequestsController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    unfollowUserController
}