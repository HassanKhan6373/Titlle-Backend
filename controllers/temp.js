const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}
const login = async (req, res) => {
  try{
    let useremail = await user.findOne({ email: req.body.email });
    if(!useremail){
        return res.status(400).json({errors:"Invalid Email address"})
    }
    if(req.body.password !== useremail.password){
        return res.status(400).json({errors:"Invalid password"})
    }
    const data={
        user:{
            id:useremail.id
        }
    }
    const authToken = jwt.sign(data, jwtSeceret);
    res.json({success: true, authToken:authToken });
    }
catch(error){
    console.log(error);
    res.json({sucess:false})
}
};

const viewuser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


const blockUserLogin = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, { blocked: true }, { new: true });
    res.json({ message: 'User login blocked', user });
  } catch (error) {
    console.error('Error blocking user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const unblockUserLogin = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, { blocked: false }, { new: true });
    res.json({ message: 'User login unblocked', user });
  } catch (error) {
    console.error('Error unblocking user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};




const addPoint =async (req, res) => {
  const { userId } = req.params;
  const { pointsToAdd } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { points: pointsToAdd } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.points >= 700) {
      user.VIP.VIPLevel = 7;
    } else if (user.points >= 600) {
      user.VIP.VIPLevel = 6;
    } else if (user.points >= 500) {
      user.VIP.VIPLevel = 5;
    } else if (user.points >= 400) {
      user.VIP.VIPLevel = 4;
    } else if (user.points >= 300) {
      user.VIP.VIPLevel = 3;
    } else if (user.points >= 200) {
      user.VIP.VIPLevel = 2;
    } else if (user.points >= 100) {
      user.VIP.VIPLevel = 1;
    } else {
      user.VIP.VIPLevel = 0;
    }

    await user.save();

    res.json({ message: 'Points added successfully', user });
  } catch (error) {
    console.error('Error adding points:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const subtractPoint = async (req, res) => {
  const { userId } = req.params;
  const { pointsToSubtract } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.points < pointsToSubtract) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    user.points -= pointsToSubtract;
    if (user.points >= 700) {
      user.VIP.VIPLevel = 7;
    } else if (user.points >= 600) {
      user.VIP.VIPLevel = 6;
    } else if (user.points >= 500) {
      user.VIP.VIPLevel = 5;
    } else if (user.points >= 400) {
      user.VIP.VIPLevel = 4;
    } else if (user.points >= 300) {
      user.VIP.VIPLevel = 3;
    } else if (user.points >= 200) {
      user.VIP.VIPLevel = 2;
    } else if (user.points >= 100) {
      user.VIP.VIPLevel = 1;
    } else {
      user.VIP.VIPLevel = 0;
    }

    await user.save();

    res.json({ message: 'Points subtracted successfully', user });
  } catch (error) {
    console.error('Error subtracting points:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const addBalance = async (req, res) => {
  const { userId } = req.params;
  const { balanceToAdd } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { balance: balanceToAdd } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Balance added successfully', user });
  } catch (error) {
    console.error('Error adding balance:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const subtractBalance = async (req, res) => {
  const { userId } = req.params;
  const { balanceToSubtract } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.balance < balanceToSubtract) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    user.balance -= balanceToSubtract;
    await user.save();

    res.json({ message: 'Balance subtracted successfully', user });
  } catch (error) {
    console.error('Error subtracting balance:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

 
const updateUser = async (req, res) => {
  let { name, email, password } = req.body;
  const userId = req.params.id;  
  const salt = await bcrypt.genSalt(10)
  password = await bcrypt.hash(password, salt)
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { name, email, password } }, 
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  updateUser,
  login,

  viewuser,
  blockUserLogin,
  unblockUserLogin,
  editUser,

  addPoint,
  subtractPoint,
  
}


const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')


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
  

module.exports = {
addMovieReview
}