const mongoose = require('mongoose');

// Define a list of allowed movie reviews
const allowedReviews = [`I'm so glad I took time to see this`,'What a brilliant movie','I had a fun time watching that','I think this is a masterpiece','I feel that it is still a bit worse','Can we rewatch it?'];

// Movie Rating and Review Schema
const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  rating: Number,
  review: {
    type: String,
    validate: {
      validator: function (review) {
        return allowedReviews.includes(review);
      },
      message: 'Invalid review. Allowed reviews: ' + allowedReviews.join(', '),
    },
  },
});

const movieSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,'please provide title']
  },
product:{
  type:String,
  required:[true,'please provide product']
},price:{
  type:Number,
  required:[true, 'please provide price'],
},
  ratingsAndReviews: [ratingSchema], // Array of rating/review subdocuments
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
