import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import { AuthProvider } from '../src/components/AuthContext/AuthContext';
import ProfilePage from './components/ProfilePage';
import FeedPage from './components/FeedPage';
import LoginPage from './components/LoginPage';
import NavBar from './components/Navbar/NavBar';
import MovieList from './components/MovieList/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>        
          <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
      </AuthProvider>
    </div>
    
  );
}

export default App;