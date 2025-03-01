import express from "express";
import { addMovie, deleteMovie, getAllMovies, getSortedMovies, searchMovies, updateMovie } from "../controllers/movie.controller.js";
import { verifyAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/movies", getAllMovies);
router.get("/movies/sorted", getSortedMovies);
router.get("/movies/search", searchMovies);

// Admin-only routes
router.post("/movies", verifyToken,verifyAdmin, addMovie);
router.put("/movies/:id", verifyToken,verifyAdmin, updateMovie);
router.delete("/movies/:id", verifyToken,verifyAdmin, deleteMovie);

export default router;
