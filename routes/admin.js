const express = require('express')
const router = express.Router()
const { getAllUsers,editUser ,blockUserLogin,unblockUserLogin,addUserPoints,subtractUserPoints,addUserBalance,subtractUserBalance,editUserVipLevel,approveUserActions,blockUserActions, getUnblockedUsers, getBlockedUsers,getUserID,updateUserLevel} = require('../controllers/admin')
 
router.get('/get-all-users', getAllUsers);
router.post('/block-user/:id', blockUserLogin);
router.patch('/unblock-user/:id', unblockUserLogin);
router.patch('/edit/:id', editUser);

router.patch('/add-user-points/:id', addUserPoints);
router.patch('/subtract-user-points/:id', subtractUserPoints);
router.patch('/add-user-balance/:id', addUserBalance);
router.patch('/subtract-user-balance/:id', subtractUserBalance);

router.patch('/edit-user-VIPLevel/:id', editUserVipLevel);

router.patch('/approve-user-action/:id', approveUserActions);
router.patch('/block-user-action/:id', blockUserActions);
router.get('/get-blocked-users', getBlockedUsers)
router.get('/get-unblocked-users', getUnblockedUsers)
router.get('/get-user-id', getUserID)
router.patch('/update-user-VIPlevel', updateUserLevel)



module.exports = router
