const Admin = require("../models/Admin");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const getBlockedUsers = async (req, res) => {
  try {
    const blockedUsers = await User.find({ blocked: true });
    if (!blockedUsers) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No user is blocked" });
    }
    res.status(StatusCodes.OK).json({ blockedUsers });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

const getUnblockedUsers = async (req, res) => {
  try {
    const unblockedUsers = await User.find({ blocked: false });
    if (!unblockedUsers) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No user is unblocked" });
    }
    res.status(StatusCodes.OK).json({ unblockedUsers });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({ users: users });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const blockUserLogin = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
    const user = await User.findById(id);
    user.blocked = true;
    user.save();
    res.json({ message: "User login blocked" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const unblockUserLogin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    user.blocked = false;
    user.save();
    res.json({ message: "User login unblocked" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
const getUserID = async (req, res) => {
  const { name } = req.query;
  try {
    console.log(name);
    const user = await User.findOne({ name });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User doesnt exist" });
    }
    res.status(StatusCodes.OK).json({ userId: user._id });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "ERROR" });
  }
};

// const addUserPoints =async (req, res) => {
//   const { id } = req.params;
//   const { pointsToAdd } = req.body;

//   try {
//     const user = await User.findById( id );

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     user.points += pointsToAdd
//     if (user.points >= 700) {
//       user.VIP = 7;
//     } else if (user.points >= 600) {
//       user.VIP = 6;
//     } else if (user.points >= 500) {
//       user.VIP = 5;
//     } else if (user.points >= 400) {
//       user.VIP = 4;
//     } else if (user.points >= 300) {
//       user.VIP = 3;
//     } else if (user.points >= 200) {
//       user.VIP = 2;
//     } else if (user.points >= 100) {
//       user.VIP = 1;
//     } else {
//       user.VIP.VIPLevel = 0;
//     }

//     await user.save();

//     res.status(200).json({ message: 'Points added successfully' });
//   } catch (error) {
//     console.error('Error adding points:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const editUserVipLevel = async (req, res) => {
  const { id } = req.params;
  const { newLevel } = req.body;
  try {
    if (newLevel >= 3) {
      res.status(400).json({ message: "Level cant be more than 2" });
    }
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.VIP = newLevel;
    user.save();
    res.status(200).json({ message: "User level updated", user });
  } catch (error) {
    console.error("Error adding points:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// const subtractUserPoints =async (req, res) => {
//   const { id } = req.params;
//   const { pointsToSubtract } = req.body;

//   try {
//     const user = await User.findById( id );

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     user.points -= pointsToSubtract
//     if (user.points >= 700) {
//       user.VIP = 7;
//     } else if (user.points >= 600) {
//       user.VIP = 6;
//     } else if (user.points >= 500) {
//       user.VIP = 5;
//     } else if (user.points >= 400) {
//       user.VIP = 4;
//     } else if (user.points >= 300) {
//       user.VIP = 3;
//     } else if (user.points >= 200) {
//       user.VIP = 2;
//     } else if (user.points >= 100) {
//       user.VIP = 1;
//     } else {
//       user.VIP.VIPLevel = 0;
//     }

//     await user.save();

//     res.status(200).json({ message: 'Points subtracted successfully' ,user});
//   } catch (error) {
//     console.error('Error adding points:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
const addUserBalance = async (req, res) => {
  const { id } = req.params;
  const { balanceToAdd } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found", user });
    }
    user.balance += balanceToAdd;
    user.save();

    res.json({ message: "User balance updated", user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const subtractUserBalance = async (req, res) => {
  const { id } = req.params;
  const { balanceToSubtract } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.balance -= balanceToSubtract;
    user.save();

    res.json({ message: "User balance updated", user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

//need further details to test this API, have to know beforehand which actions are to be blocked

const blockUserActions = async (req, res) => {
  const { id } = req.params;
  const { actionType } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { [`actions.${actionType}`]: false } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: `User action ${actionType} blocked`, user });
  } catch (error) {
    console.error("Error blocking user action:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const approveUserActions = async (req, res) => {
  const { id } = req.params;
  const { actionType } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { [`actions.${actionType}`]: true } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: `User action ${actionType} approved`, user });
  } catch (error) {
    console.error("Error approving user action:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateUserLevel = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.VIP <= 2) {
      user.moviesRated = 0;
      user.VIP += 1;
    }
    res.status(200).json({ message: `User level updated`, user });
  } catch (error) {
    console.error("Error approving user action:", error);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  updateUserLevel,
  getAllUsers,
  editUser,
  blockUserLogin,
  unblockUserLogin,
  // addUserPoints,
  // subtractUserPoints,
  addUserBalance,
  subtractUserBalance,
  editUserVipLevel,
  approveUserActions,
  blockUserActions,
  getUnblockedUsers,
  getBlockedUsers,
  getUserID,
};
