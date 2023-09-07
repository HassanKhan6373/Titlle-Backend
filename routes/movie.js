const express = require('express')
const router = express.Router()
const { addMovie } = require('../controllers/movie')
router.post('/addMovie', addMovie)

module.exports = router
