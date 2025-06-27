const express = require('express')
const router = express.Router()
const gameGenreController = require('../controllers/gameGenreController')

router.post('/createGameGenre', gameGenreController.createGameGenre)
router.get('/getAllGenre', gameGenreController.getAllGenre)

module.exports = router