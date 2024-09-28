import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import { AuthProvider } from '../src/contexts/AuthContext';
import Registration from './pages/auth/UserRegistration';
import ProfilePage from './pages/profiles/ProfilePage';
import ProfileList from './pages/profiles/ProfileList'
import EditProfile from './pages/profiles/EditProfile';
import FeedPage from './pages/feed/FeedPage';
import LoginPage from './pages/auth/LoginPage';
import NavBar from './components/Navbar/NavBar';
import MovieList from './pages/movie/MovieList';
import MovieDetail from './pages/movie/MovieDetail';
import BansPage from './pages/bans/BansPage';
import BanAppealPage from './pages/bans/BanAppealPage';
import NotFound from './pages/404/NotFound';


function App() {
  return (
    <div>
      <AuthProvider>
        <Router>        
          <NavBar />
            <Routes>
              <Route path='*' element={<NotFound />}/>
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