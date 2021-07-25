const express = require('express')
const router = express.Router()

const Terrace = require('../models/Terrace.model')
// const Experience = require('../models/Experience.model')
const { formatDate, toDate } = require("./../../utils")

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
    const { terraceName, terraceCity, rating } = req.body
    const user = req.session.currentUser._id

    const features = {
        tableDistance: req.body.tableDistance ? req.body.tableDistance : '',
        booking: req.body.booking ? true : false,
        music: req.body.music ? true : false,
        outdoors: req.body.outdoors ? req.body.outdoors : '',
    }

    //const experience ={username,comments,rating} =req.body

    Terrace
        .create({ user, terraceName, terraceCity, features, rating })
        .then(newTerrace => res.json(newTerrace))
        .catch(err => console.error(err))
})


module.exports = router