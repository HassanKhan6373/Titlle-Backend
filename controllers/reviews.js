const User = require("../models/User");
const Movie = require("../models/Movie");
const { StatusCodes } = require("http-status-codes");

const setMovieReview = async (req, res) => {
  const userId = req.params.userId;
  const movieId = req.params.movieId;
  try {
    let points = 0;

    // const movieData = req.body[/];
    const review_rating = { review: "", rating: 0 };
    // const keys = Object.keys(movieData)
    const user = await User.findByIdAndUpdate(userId);
    const movie = await Movie.findByIdAndUpdate(movieId);
    //checking to add points based on reviews and ratings
    if (req.body.review) {
      points += 0.7;
      review_rating["review"] = req.body.review;
    }
    if (req.body.rating) {
      points += 0.3;
      review_rating["rating"] = req.body.rating;
    }
    console.log(movie);

    const existingReview = movie.ratingsAndReviews.find(
      (review) => String(review.user) === String(user._id)
    );

    movie.ratingsAndReviews.push({
      user: user._id,
      rating: review_rating["rating"],
      review: review_rating["review"],
    });
    if (!existingReview) {
      user.points += points;
      user.moviesRated += 1;
      //checking to update VIP levels
      if (user.movieRated === 30) {
        //  user.movieRated = 0;
        user.VIP += 1;
      }
      if (user.VIP === 0) {
        user.commRate = 0.3;
      } else if (user.VIP === 1) {
        user.commRate = 0.35;
      } else if (user.VIP === 2) {
        user.commRate = 0.4;
      } else if (user.VIP === 3) {
        user.commRate = 0.45;
      }

      //  }else if(user.VIP===4){
      //   user.commRate = 0.50
      //  }else if(user.VIP===5){
      //   user.commRate = 0.60
      //  }
      //  else if(user.VIP===6){
      //   user.commRate = 0.70

      //  }else if(user.VIP===7){
      //   user.commRate = 0.85

      //  }else if(user.VIP===8){
      //   user.commRate = 1.10

      //  }
    }
    await user.save();
    await movie.save();
    res
      .status(StatusCodes.OK)
      .json({ msg: "Movie reviews have been inserted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserMovieReview = async (req, res) => {
  const userId = req.params.userID;
  const movieId = req.params.movieID;

  try {
    const user = await User.findById(userId);
    const movie = await Movie.findById(movieId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    if (!movie) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Movie not found" });
    }

    // Find the review and rating for the specific user
    const userReview = movie.ratingsAndReviews.find(
      (review) => String(review.user) === String(user._id)
    );

    if (!userReview) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User review not found for this movie" });
    }

    // Extract the review and rating from the userReview object
    const { review, rating } = userReview;

    // You can now use 'review' and 'rating' as needed
    res.status(StatusCodes.OK).json({ review, rating });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const updateUserMovieReview = async (req, res) => {
  const userId = req.params.userID;
  const movieId = req.params.movieID;
  const { review, rating } = req.body;

  try {
    // Update the user's review and rating for the movie
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      {
        $set: {
          "ratingsAndReviews.$[elem].review": review,
          "ratingsAndReviews.$[elem].rating": rating,
        },
      },
      {
        new: true, // Return the updated movie document
        arrayFilters: [{ "elem.user": userId }],
      }
    );

    if (!updatedMovie) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Movie not found" });
    }

    res.status(StatusCodes.OK).json({
      message: "Review and rating updated successfully",
      updatedMovie,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = {
  setMovieReview,
  getUserMovieReview,
  updateUserMovieReview,
};
