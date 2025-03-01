import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/movies");
      setMovies(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Login user
  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/login",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      setUser({ username, role: response.data.role });
    } catch (error) {
      console.error(error);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === "admin";
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        error,
        user,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        fetchMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
