const express = require('express')
const router = express.Router()
const { addRecord,getAllRecords,getRandomRecord,getMaxTaskUsers} = require('../controllers/records')
router.post('/add-record/', addRecord)
router.get('/get-records/:id/', getAllRecords)
router.get('/get-random-record/:id/', getRandomRecord)
router.get('/users-with-max-30-tasks-complete', getMaxTaskUsers )
module.exports = router