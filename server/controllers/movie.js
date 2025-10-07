const Movie = require('../models/Movie');
const { errorHandler } = require('../errorHandler');

module.exports.addMovie = async (req, res) => {
  try {
    const { title, director, year, description, genre } = req.body;

    const newMovie = new Movie({
      title,
      director,
      year,
      description,
      genre,
    });

    const savedMovie = await newMovie.save();
    return res.status(201).json(savedMovie);

  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json({ movies });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports.getMovieById = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId).populate('comments.userId', 'email isAdmin');
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    res.status(200).json({ movie });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports.updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const updates = req.body;

    const movie = await Movie.findByIdAndUpdate(movieId, updates, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    res.status(200).json({ message: 'Movie updated successfully', movie });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports.deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not deleted' });
    }

    return res.status(200).json({ message: 'Movie deleted successfully' });

  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports.addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { movieId } = req.params;
    const userId = req.user.id;

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const newComment = { userId, comment: comment.trim(), createdAt: new Date() };
    movie.comments.push(newComment);
    await movie.save();

    res.status(200).json({ message: 'Comment added', comment: newComment });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports.getComments = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId).populate('comments.userId', 'email isAdmin');

    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    res.status(200).json({ comments: movie.comments });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
