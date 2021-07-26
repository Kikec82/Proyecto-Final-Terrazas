
const express = require('express')
const router = express.Router()

const { CDNupload } = require('../config/cloudinary.config')

router.post('/image', CDNupload.single("imageData"), (req, res) => {

    if (!req.file) {
        res.status(500).json({ code: 500, message: 'Error loading the file' })
        return
    }

    res.json({ cloudinary_url: req.file.path })
})


module.exports = router;