import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieProvider } from './context/MovieContext';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {

  return (
   <>
    <MovieProvider>
      <Router>
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      </Router>    
    </MovieProvider>   
  </>
  )
}

export default App
