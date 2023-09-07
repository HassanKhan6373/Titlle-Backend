const express = require('express')
const router = express.Router()
const {getUserVIPLevel,getUserPoints, getUserBalance } = require('../controllers/rewards')



router.get('/points/:userID/',getUserPoints)
router.get('/VIPLevel/:userID/',getUserVIPLevel)
router.get('/balance/:userID/',getUserBalance)



module.exports = router
