const express = require('express')
const router = express.Router()

const Terrace = require('../models/Terrace.model')
// const Experience = require('../models/Experience.model')


//Muestra todas las terrazas
router.get('/', (req, res) => {

    Terrace
        .find(req.query)
        .then(allTerrace => res.json(allTerrace))
        .catch(err => res.json({ message: 'Error fetching ', err }))
})

//Detalles terraza seleccionada

router.get('/:id', (req, res, next) => {
    Terrace
        .findById(req.params.id)
        .then(oneTerrace => res.json(oneTerrace))
        .catch(err => console.error(err))
})

//Terrazas nuevas. Crear reseña 

router.post('/new', (req, res) => {
    const { terraceName, terraceCity, rating, lat, lng } = req.body
    const user = req.session.currentUser._id

    const { tableDistance, booking, music, outdoors } = req.body
    const features = {
        tableDistance: tableDistance || '',
        booking: booking || false,
        music: music || false,
        outdoors: outdoors || '',
    }

    const location = {
        type: "Point",
        coordinates: [lat, lng]
    }

    Terrace
        .findOne({ terraceName })
        .then(terrace => {

            if (terrace) {
                terrace.numberOfRatings += 1
                terrace.rating = parseInt(terrace.rating) + parseInt(rating) / terrace.numberOfRatings

                Terrace
                    .findByIdAndUpdate(terrace._id, terrace)
                    .then(() => res.json(terrace))
                    .catch(err => console.log(err))

                return
            }

            Terrace
                .create({ location, user, terraceName, terraceCity, features, rating: parseFloat(rating) })
                .then(newTerrace => res.json(newTerrace))
                .catch(err => console.error(err))
        }
        )
})


module.exports = router