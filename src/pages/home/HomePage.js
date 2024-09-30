import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jumbotron from '../../assets/jumbotron.jpg';
import { ThumbsUp, MessageCircle, Star, Film } from 'lucide-react';
import api from '../../api/axios';
import './HomePage.css';

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchTrendingMovies = async (retries = 3) => {
      try {
        const response = await api.get('movies/?ids=25,80,150');
        if (isMounted) {
          setTrendingMovies(response.data.results.slice(0, 3));
          setLoading(false);
        }
      } catch (err) {
        if (retries > 0) {
          setTimeout(() => fetchTrendingMovies(retries - 1), 1000);
        } else if (isMounted) {
          setError('Failed to load trending movies.');
          setLoading(false);
        }
      }
    };

    fetchTrendingMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center alert alert-danger">{error}</div>;
  }

  return (
    <div className="home-page-content">
      {/* Jumbotron Section */}
      <div
        className="jumbotron-text"
        style={{
          backgroundImage: `url(${jumbotron})`,
        }}
      >
        <div className="jumbotron-overlay"></div>
        <div className="jumbotron-content">
          <h1>Discover the Golden Age of Cinema</h1>
          <p>Explore, rate, and discuss classic films from yesteryear</p>
          <Link to="/register" className="btn btn-primary">Join the Community</Link>
          
          {/* Feature Section */}
          <div className="feature-section">
            <div className="feature-cards">
              {[
                { icon: Star, title: 'Rate', description: 'Share your thoughts on timeless classics.' },
                { icon: MessageCircle, title: 'Discuss', description: 'Engage in lively discussions about your favorite old movies.' },
                { icon: Film, title: 'Discover', description: 'Uncover new classic films based on community recommendations.' }
              ].map((item, index) => (
                <div key={index} className="feature-card">
                  <div className={`feature-icon ${item.title.toLowerCase()}-icon`}>
                    <item.icon size={48} />
                  </div>
                  <h3 className="text-center">{item.title}</h3>
                  <p className="text-center">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trending Now Section */}
      <div className="trending-section">
        <h2>Trending Classics</h2>
        <div className="row">
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="col-md-4">
              <div className="movie-card-wrapper" onClick={() => handleMovieClick(movie.id)} tabIndex={0}>
                <div className="card">
                  <img src={movie.thumbnail} className="card-img-top" alt={movie.title} />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <div className="d-flex justify-content-between">
                      <span><ThumbsUp size={16} /> {movie.likes_count}</span>
                      <span><MessageCircle size={16} /> {movie.comments_count}</span>
                    </div>
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