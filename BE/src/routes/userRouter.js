const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware')

router.post('/createUser', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.get('/getAllUser', userController.getAllUser)
router.get('/getDetailUser/:userId', userController.getDetailUser)
router.post('/refresh-token', userController.refreshToken)
router.post('/sendOtp', userController.sendOtp)
router.post('/verifyOtp', userController.verifyOtp)
router.post('/checkAccount', userController.checkAccount)

module.exports = router