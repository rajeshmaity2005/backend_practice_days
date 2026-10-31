const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    artist: {
        type: String,
        default: "Unknown Artist"
    },

    mood: {
        type: String,
        enum: {
            values: ["sad", "happy", "surprised"],
            message: "Enum this is"
        }
    },

    url: {
        type: String,
        required: true
    },

    posterUrl: {
        type: String,
        required: true
    },

    lyrics: {
        type: String,
        default: ""
    }

}, { timestamps: true });

const songModel = mongoose.model("songs", songSchema)

module.exports = songModel







// const mongoose = require("mongoose")

// const songSchema = new mongoose.Schema({
//     url: {
//         type: String,
//         required: true
//     },
//     posterUrl: {
//         type: String,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     mood:{
//         type:String,
//         enum:{
//             values:["sad","happy","surprised"],
//             message:"Enum this is"
//         }
//     }
// })

// const songModel = mongoose.model("songs", songSchema)

// module.exports = songModel