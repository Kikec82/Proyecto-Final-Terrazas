const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const { CDNupload } = require('./../config/cloudinary.config')
const User = require('../models/User.model')

//Signup (post)

router.post('/signup', CDNupload.single("imageData"),(req, res) => {
    //TO-DO ARREGLAR falla si el email esta repe
    const { username, pwd, city, email, image } = req.body
    let path
    if (req.file === undefined) {
        path = req.session.currentUser.image
    } else {
        path = req.file.path
    }


    User
        .findOne({ email })
        .then(user => {
            if (user) {
                //    TO_DO poner alerta en pantalla de usuario regsitrado
                res.status(400).json({ code: 400, message: 'Usuario ya existe' })
                return
            }

            const salt = 10
            const hashPass = bcrypt.hashSync(pwd, salt)

            User
                .create({ username, password: hashPass, city, email, image: path })
                .then((user) => {
                    res.json(user)
                    console.log(path)
                })
                .catch(err => console.log(err, 'aqui hay error'))
        })
        .catch(err => console.log(err))
})


//Login (post)
router.post('/login', (req, res) => {
    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {
            if (!user) {
                res.status(401).json({ code: 401, message: 'Usuario no registrado' })
                return
            }
            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.status(401).json({ code: 401, message: 'Contraseña incorrecta' })
                return
            }
            req.session.currentUser = user
            res.json(user)
        })
        .catch(err => console.log(err))
})

//Edit Profile (post)
router.post('/editProfile/:userId', CDNupload.single('image'), (req, res) => {

    const { username, pwd, email, image, city } = req.body
    let path
    if (req.file === undefined) {
        path = req.session.currentUser.image
    } else {
        path = req.file.path
    }

    const { userId } = req.params

    User
        .findByuserIdAndUpdate(userId, { username, pwd, email, image, city, image: path })
        .then(() => {
            res.redirect('/profile')
        })
        .catch(err => console.log(err))
})
//Edit Profile (get)
router.get('/editProfile/:userId', CDNupload.single('image'), (req, res) => {
   
    User
    
        .findById(req.params.userId)
        .then(response => {
            console.log(response)
            res.json(response)
        })
        .catch(err => console.error(err));

})

// router.get('/:id', (req, res, next) => {
//     Terrace
//         .findById(req.params.id)
//         .then(oneTerrace => res.json(oneTerrace))
//         .catch(err => console.error(err))
// })




router.get('/close', (req, res) => req.session.destroy(() => res.json('/')))

router.get('/loggedin', (req, res) => {
    req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized' })
})
module.exports = router
