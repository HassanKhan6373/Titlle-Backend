const express = require('express')
const router = express.Router()
const {validateTicketPrice } = require('../controllers/ticketPrice')



router.get('/ticketPrice/:userID/',validateTicketPrice)



module.exports = router
