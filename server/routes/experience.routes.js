const express = require('express')
const router = express.Router()

const Experience = require('../models/Experience.model')
const Terrace = require('../models/Terrace.model')

//Muestra todas las experencias
router.get('/', (req, res) => {
    Experience
        .find(req.query)
        .populate("terrace")
        .then(allExperience => res.json(allExperience))
        .catch(err => res.json({ message: 'Error fetching ', err }))
})
//Detalles experiencia seleccionada

router.get('/:id', (req, res, next) => {
    Experience
        .findById(req.params.id)
        .populate("terrace")
        .then(oneExperience => res.json(oneExperience))
        .catch(err => console.error(err))
})

// Experiencia Nueva. Crear reseñas.

router.post('/new', (req, res) => {
    const { username,terrace, comments } = req.body

    const user = req.session.currentUser._id

    const features = {
        tableDistance: req.body.tableDistance ? req.body.tableDistance : '',
        booking: req.body.booking ? true : false,
        music: req.body.music ? true : false,
        outdoors: req.body.outdoors ? req.body.outdoors  : '',
        image: req.body.image ? req.body.image : '',
    }

    //const experience ={username,comments,rating} =req.body

    Experience
        .create({ username, terrace, features, comments})
        .then(newExperience => res.json(newExperience))
        .catch(err => console.error(err))

})

module.exports = router