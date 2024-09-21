import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import spacer from '../assets/spacer.png';
import jumbotron from '../assets/jumbotron.jpg';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import api from '../api/axios'; 
import './HomePage.css';

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await api.get('movies/?ids=25,80,150');
        setTrendingMovies(response.data.results.slice(0, 3));
      } catch (err) {
        console.error('Error fetching trending movies:', err);
        setError('Failed to load trending movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div>
      {/* Jumbotron Section */}
      <div className="jumbotron text-center" style={{
        position: 'relative',
        padding: '150px 0',
        background: `url(${jumbotron}) no-repeat center center / cover`
      }}>
        <h1 className="display-4 font-weight-bold text-white">
          Discover the Golden Age of Cinema!
        </h1>
        <p className="lead text-white">
          We have it all!
        </p>
      </div>

      {/* Spacer Section */}
      <div className="text-center">
        <img 
          src={spacer} 
          alt="spacer" 
          className="logo" 
          style={{ width: '80%', height: 'auto', maxHeight: '50px' }}
        />
      </div>

      {/* Trending Now Section */}
      <div className="trending-section" style={{ marginTop: '60px' }}>
        <h2 className="text-center">Trending Now</h2>
        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center alert alert-danger">{error}</div>}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center">
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="col" style={{ padding: '0 15px' }}>
              <div 
                className="card h-100" 
                onClick={() => handleMovieClick(movie.id)}
                style={{ cursor: 'pointer' }}
              >
                <img src={movie.thumbnail} className="card-img-top" alt={movie.title} style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title text-center">{movie.title}</h5>
                  <div className="d-flex justify-content-center gap-3">
                    <span className="d-flex align-items-center">
                      <ThumbsUp size={16} className="me-1" />
                      {movie.likes_count}
                    </span>
                    <span className="d-flex align-items-center">
                      <MessageCircle size={16} className="me-1" />
                      {movie.comments_count}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;