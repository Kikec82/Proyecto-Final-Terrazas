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
    console.log(req.body)
    const { terrace, comments } = req.body

    const user = req.session.currentUser._id
    
    const { tableDistance, booking, music, outdoors, image } = req.body
    const features = {
        tableDistance: tableDistance || '',
        booking: booking || false,
        music: music || false,
        outdoors: outdoors || '',
        image: image || '',
    }
   
    Experience
        .create({ username: req.session.currentUser.username, terrace, features, comments })
        .then(newExperience => res.json(newExperience))
        .catch(err => console.error(err))

})

module.exports = router