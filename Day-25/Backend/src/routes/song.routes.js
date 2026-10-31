const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const songController = require("../controllers/song.controller");

router.post(
    "/upload",
    upload.fields([
        { name: "song", maxCount: 1 },
        { name: "poster", maxCount: 1 },
        { name: "lyrics", maxCount: 1 }
    ]),
    songController.uploadSong
);
/**
 * /api/songs/
 */
router.post('/', upload.single('song'), songController.uploadSong)


router.get('/', songController.getSong)

module.exports = router;