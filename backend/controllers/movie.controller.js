import { Movie } from "../models/movie.model.js";

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies", error: err });
  }
};

// Get sorted movies
export const getSortedMovies = async (req, res) => {
  const { sortBy } = req.query;
  let sortQuery = {};

  switch (sortBy) {
    case "name":
      sortQuery = { title: 1 };
      break;
    case "rating":
      sortQuery = { rating: -1 };
      break;
    case "releaseDate":
      sortQuery = { releaseDate: -1 };
      break;
    case "duration":
      sortQuery = { duration: 1 };
      break;
    default:
      sortQuery = { title: 1 };
  }

  try {
    const movies = await Movie.find().sort(sortQuery);
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error sorting movies", error: err });
  }
};

// Search movies
export const searchMovies = async (req, res) => {
  try {
    const { title, description } = req.query;
    const query = {};
    if (title) query.title = { $regex: title, $options: "i" };
    if (description) query.description = { $regex: description, $options: "i" };
    const movies = await Movie.find(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new movie (admin only)
export const addMovie = async (req, res) => {
  try {
    const { title, description, releaseDate, rating, duration } = req.body;
    const newMovie = new Movie({
      title,
      description,
      releaseDate,
      rating,
      duration,
    });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a movie (admin only)
export const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, {
      new: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: "Error updating movie", error: err });
  }
};

// Delete a movie (admin only)
export const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting movie", error: err });
  }
};
