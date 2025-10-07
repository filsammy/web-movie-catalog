const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie');
const auth = require('../auth');

const { verify, verifyAdmin } = auth;

router.post('/addMovie', verify, verifyAdmin, movieController.addMovie);

router.get('/getMovies', movieController.getMovies);

router.get('/getMovie/:movieId', movieController.getMovieById);

router.patch('/updateMovie/:movieId', verify, verifyAdmin, movieController.updateMovie);

router.delete('/deleteMovie/:movieId', verify, verifyAdmin, movieController.deleteMovie);

router.patch('/addComment/:movieId', verify, movieController.addComment);

router.get('/getComments/:movieId', verify, movieController.getComments);

module.exports = router;
