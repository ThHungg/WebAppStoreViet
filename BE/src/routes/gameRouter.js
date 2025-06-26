const express = require('express')
const router = express.Router()
const gameController = require('../controllers/gameController')

router.post('/createGame', gameController.createGame)

module.exports = router