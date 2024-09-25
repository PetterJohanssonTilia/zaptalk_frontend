import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import spacer from '../../assets/spacer.png';
import jumbotron from '../../assets/jumbotron.jpg';
import { ThumbsUp, MessageCircle } from 'lucide-react';
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
          console.log(`Retrying... (${retries} attempts left)`);
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
    <div>
      {/* Jumbotron Section */}
      <div className="jumbotron text-center jumbotron-text" 
        style={{
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
          className="spacer-picture" 
        />
      </div>

      {/* Trending Now Section */}
      <div className="trending-section">
        <h2 className="text-center trending-now-text">Trending Now</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center">
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="col px-3">
              <div 
                className="movie-card-wrapper"
                onClick={() => handleMovieClick(movie.id)}
              >
                <div className="card bg-dark h-100">
                  <img src={movie.thumbnail} className="card-img-top" alt={movie.title}/>
                  <div className="card-body ">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;