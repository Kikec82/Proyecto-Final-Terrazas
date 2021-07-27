const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const { CDNupload } = require('./../config/cloudinary.config')

//Pág inicial de usuario
router.get('/', (req, res) => {
    const user_ID = req.session.currentUser._id

    User
        .findById(user_ID)
        .then(response => {
            res.json(user_ID, response)
        })
        .catch(err => console.error(err));
})
// Editar usuario
router.get('/edit/:userId', (req, res, next) => {
     console.log(req.params.id)
    User
        .findById(req.params.userId)
        .then(response => res.json(response))
        .catch(err => console.error(err))
})

//pinta usuario ya editado
router.post('/edit/:userId', CDNupload.single('image'), (req, res) => {

    const { username, pwd, city, email, image } = req.body
    let path
    if (req.file === undefined) {
        path = req.session.currentUser.image
    } else {
        path = req.file.path
    }

    const { userId } = req.params

    User
        .findByIdAndUpdate(userId, { username, pwd,city, email, image: path })
        .then(() => {
            res.json(userId)
        })
        .catch(err => console.log(err))
})


module.exports = router