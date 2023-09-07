const express = require('express')
const router = express.Router()
const { setMovieReview ,getUserMovieReview,updateUserMovieReview} = require('../controllers/reviews')
router.post('/:userId/:movieId', setMovieReview);
router.get('/:userID/:movieID',getUserMovieReview)
router.patch('/:userID/:movieID',updateUserMovieReview)
module.exports = router
