const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");
const path = require("path");

async function uploadSong(req, res) {
    try {
        // Get uploaded files
        const songFile = req.files?.song?.[0];
        const posterFile = req.files?.poster?.[0];
        const lyricsFile = req.files?.lyrics?.[0];

        // Check required files
        if (!songFile || !posterFile) {
            return res.status(400).json({
                message: "Song and poster files are required"
            });
        }

        // Get additional information
        const { mood, artist } = req.body;

        // Read MP3 metadata
        const tags = id3.read(songFile.buffer);


        // Get title from metadata or filename
        const title =
            tags.title ||
            path.parse(songFile.originalname).name;

        // Get artist from metadata or request body
        const songArtist =
            artist ||
            tags.artist ||
            "Unknown Artist";

        // Read lyrics/text file
        let lyrics = "";

        if (lyricsFile) {
            lyrics = lyricsFile.buffer.toString("utf8");
        }


        // Upload song to ImageKit
        const [songFileUpload, posterFileUpload] = await Promise.all([
            storageService.uploadFile({
                buffer: songFile.buffer,
                filename: songFile.originalname,
                folder: "/cohort-2/moodify/songs"
            }),
            storageService.uploadFile({
                buffer: posterFile.buffer,
                filename: posterFile.originalname,
                folder: "/cohort-2/moodify/posters"
            })
        ]);

        // Create song in database
        const song = await songModel.create({
            title,
            artist: songArtist,
            mood,
            url: songFileUpload.url,
            posterUrl: posterFileUpload.url,
            lyrics
        });

        return res.status(201).json({
            message: "Song uploaded successfully",
            song
        });

    } catch (error) {
        console.error("Song upload error:", error);

        return res.status(500).json({
            message: "Failed to upload song",
            error: error.message
        });
    }
}

async function getSong(req, res) {
    const { mood } = req.query
    const songs = await songModel.find({
        mood
    })

    res.status(200).json({
        message: "Song fetched Successfully.",
        songs
    })
}

module.exports = { 
    uploadSong,
    getSong
};
