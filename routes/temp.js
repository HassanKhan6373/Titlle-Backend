const express = require('express')
const router = express.Router()
const User = require('../models/User')

const { 
    register, 
    login,
    viewuser, 
    editUser,
    addPoint,
    subtractPoint,
    blockUserLogin,
    unblockUserLogin,
    subtractBalance,
    addBalance

    } = require('../controllers/auth')
// router.post('/api/v1/register', register)
// router.post('/api/v1/login', login)

// router.get('/api/v1/admin/viewuser',viewuser)
// router.put('/api/v1/admin/block',blockUserLogin)
// router.put('/api/v1/admin/unblock',unblockUserLogin);
router.put('/api/v1/admin/edit', editUser);

router.put('/api/v1/points/add',addPoint)
router.put('/api/v1/points/subtract',subtractPoint)

router.put('/api/v1/balance/add',addBalance)
router.put('/api/v1/balance/subtract',subtractBalance)

router.post('/user-movie-review/:id', addMovieReview);

router.put('/api/v1/actions/block', async (req, res) => {
    const { userId } = req.params;
    const { actionType } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: { [`actions.${actionType}`]: false } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: `User action ${actionType} blocked`, user });
    } catch (error) {
      console.error('Error blocking user action:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  router.put('/api/v1/actions/approve', async (req, res) => {
    const { userId } = req.params;
    const { actionType } = req.body; 
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: { [`actions.${actionType}`]: true } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: `User action ${actionType} approved`, user });
    } catch (error) {
      console.error('Error approving user action:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  router.put('/api/v1/balance/edit', async (req, res) => {
    const { userId } = req.params;
    const { newBalance } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: { balance: newBalance } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'Player balance updated', user });
    } catch (error) {
      console.error('Error editing player balance:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  


module.exports = router
