const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware')

router.post('/createUser', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.get('/getAllUser', userController.getAllUser)
router.post

module.exports = router