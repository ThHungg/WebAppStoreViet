const express = require('express')
const router = express.Router()
const gameController = require('../controllers/gameController')

router.post('/createGame', gameController.createGame)
router.get('/getAllGame', gameController.getAllGame)
router.get('/getGameFavorite', gameController.getGameFavorite)

module.exports = router