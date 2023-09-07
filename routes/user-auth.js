const express = require('express')
const router = express.Router()
const { register, login, updateUser } = require('../controllers/user-auth')
router.post('/register', register)
router.post('/login', login)
router.patch('/update/:id', updateUser);
module.exports = router
