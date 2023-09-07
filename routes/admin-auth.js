const express = require('express')
const router = express.Router()
const { loginAdmin, registerAdmin,updateUser, registerUser,loginUser } = require('../controllers/admin-auth')

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);

router.post('/user/login', loginUser);
router.post('/user/register', registerUser);
router.post('/updateuser', updateUser);
module.exports = router
