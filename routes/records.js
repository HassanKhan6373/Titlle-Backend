const express = require('express')
const router = express.Router()
const { addRecord,getAllRecords,getRandomRecord} = require('../controllers/records')
router.post('/add-record/', addRecord)
router.get('/get-records/:id/', getAllRecords)
router.get('/get-random-record/:id/', getRandomRecord)
module.exports = router