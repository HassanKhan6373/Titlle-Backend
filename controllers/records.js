const Record = require("../models/Records");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Movie = require('../models/Movie')
const addRecord = async (req, res) => {
  const {  price} =   req.body;
  try {
    // const user = await User.findByIdAndUpdate({_id:req.body.user})
    // console.log(user)
    const record = await Record.create({ ...req.body });
    // user.balance -= price
    // user.save()
    // console.log(user,record)
    res.status(StatusCodes.CREATED).json({ message: "Record added" ,record});
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error!", error });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const userId = req.params.id; // Replace with the actual user ID

    // Use Mongoose to find all orders for the specific user
    const records = await Record.find({ user: userId });
    if (!records) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Records not found" });
    }
    // Send the retrieved orders as a JSON response
    res.status(StatusCodes.OK).json({ message: "success", record: records });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error!", error });
  }
};

const getRandomRecord = async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'User not found' });
    }

    const vipPriceRanges = {
      0: 199,
      1: 1999,
      2: 3799,
      3: 7399,
      4: 14999,
      5: 27999,
      6: 37999,
      7: 119999,
      8: 250000,
    };

    // Get the maximum price based on the user's VIP level
    const maxPrice = vipPriceRanges[user.VIP];

    // Use Mongoose to find movies within the specified price range
    const randomMovie = await Movie.aggregate([
      {
        $match: {
          price: { $lte: maxPrice },
        },
      },
      { $sample: { size: 1 } }, // Retrieve one random movie
    ]);
  // console.log(randomMovie,user.VIP)
    if (!randomMovie.length) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Movies not found' });
    }

    res.status(StatusCodes.OK).send({ success: true, movie:randomMovie[0] });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Error' });
  }
};


module.exports = {
  addRecord,
  getAllRecords,
  getRandomRecord
};