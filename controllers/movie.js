const Movie = require('../models/Movie'); 
const StatusCodes = require('http-status-codes')
const addMovie = async (req, res) => {
  const { title,product,price } = req.body;

  try {
    // Create a new movie instance
    const newMovie = new Movie({
      title,
      product,
      price
    });

    await newMovie.save();

    res.status(StatusCodes.CREATED).json({ message: 'Movie added successfully', newMovie });
  } catch (error) {
    console.error('Error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};


module.exports = {
addMovie
}