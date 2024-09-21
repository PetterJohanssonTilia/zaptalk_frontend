import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import { AuthProvider } from '../src/components/AuthContext/AuthContext';
import Registration from './components/UserRegistration/UserRegistration';
import ProfilePage from './components/ProfilePage';
import ProfileList from './components/ProfileList/ProfileList'
import EditProfile from './components/EditProfile/EditProfile';
import FeedPage from './components/FeedPage';
import LoginPage from './components/LoginPage';
import NavBar from './components/Navbar/NavBar';
import MovieList from './components/MovieList/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import BansPage from './components/BansPage';
import BanAppealPage from './components/BanAppealPage';


function App() {
  return (
    <div>
      <AuthProvider>
        <Router>        
          <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/profiles" element={<ProfileList />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/bans" element={<BansPage />} /> 
              <Route path="/ban-appeal" element={<BanAppealPage />} />
            </Routes>
        </Router>
      </AuthProvider>
    </div>
    
  );
}

export default App;