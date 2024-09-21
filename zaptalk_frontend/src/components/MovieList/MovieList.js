import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import api from '../../api/axios';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFollowedLikes, setShowFollowedLikes] = useState(false);
  const [followedLikesMovies, setFollowedLikesMovies] = useState([]);
  const navigate = useNavigate();
  const observer = useRef();

  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchMovies = useCallback(async (resetMovies = false) => {
    setLoading(true);
    const params = {
      page: resetMovies ? 1 : page,
      genres: selectedGenres.map(genre => genre.toLowerCase()).join(','),
      search: searchTerm,
      sort: sortBy,
      ...(showFollowedLikes && { followed_likes: true })
    };
    const url = `movies/?${new URLSearchParams(params)}`;
    console.log('Fetching movies from URL:', url);
    try {
      const response = await api.get(url);
      console.log('Movies response:', response.data);
      const newMovies = response.data.results;
      console.log('Number of movies:', newMovies.length);
      
      if (showFollowedLikes) {
        setFollowedLikesMovies(prevMovies => resetMovies ? newMovies : [...prevMovies, ...newMovies]);
      } else {
        setMovies(prevMovies => resetMovies ? newMovies : [...prevMovies, ...newMovies]);
      }
      
      setHasMore(response.data.next !== null);
      setError(null);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('An error occurred while fetching movies.');
    } finally {
      setLoading(false);
    }
  }, [page, selectedGenres, searchTerm, sortBy, showFollowedLikes, ]);

  useEffect(() => {
    fetchMovies(true);
  }, [selectedGenres, searchTerm, sortBy, showFollowedLikes, fetchMovies]);
  
  useEffect(() => {
    if (page > 1) {
      fetchMovies(false);
    }
  }, [page, fetchMovies]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get('genres/');
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };


  const toggleFollowedLikes = () => {
    setShowFollowedLikes(prev => !prev);
    setPage(1);
    if (!showFollowedLikes) {
      setFollowedLikesMovies([]); // Clear existing followed likes movies
      fetchMovies(true); // Fetch followed likes movies
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container movie-list-container">
      <h1 className="text-center mb-4">Movies</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <input 
            type="text" 
            placeholder="Search movies..." 
            value={searchTerm} 
            onChange={handleSearchChange}
            className="form-control mb-3"
          />
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
            <button 
              onClick={() => setSortBy('most_liked')} 
              className={`btn btn-outline-primary ${sortBy === 'most_liked' ? 'active' : ''}`}
            >
              Most Liked
            </button>
            <button 
              onClick={() => setSortBy('most_commented')} 
              className={`btn btn-outline-primary ${sortBy === 'most_commented' ? 'active' : ''}`}
            >
              Most Commented
            </button>
            <button 
              onClick={toggleFollowedLikes} 
              className={`btn btn-outline-primary ${showFollowedLikes ? 'active' : ''}`}
            >
              Your Friends' Favorite Movies
            </button>
            <select 
              onChange={(e) => setSelectedGenres(e.target.value ? [e.target.value] : [])}
              className="form-select"
            >
              <option value="">Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {(showFollowedLikes ? followedLikesMovies : movies).map((movie, index) => (
          <div key={movie.id} className="col">
            <div 
              className="card h-100" 
              onClick={() => handleMovieClick(movie.id)}
              ref={index === (showFollowedLikes ? followedLikesMovies.length : movies.length) - 1 ? lastMovieElementRef : null}
            >
              <img src={movie.thumbnail} className="card-img-top" alt={movie.title} style={{height: '200px', objectFit: 'cover'}} />
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

      {loading && <div className="text-center mt-4">Loading...</div>}
      {!loading && movies.length === 0 && (
        <div className="alert alert-info mt-4">
          {showFollowedLikes 
            ? "No movies liked by users you follow."
            : "No movies found matching your criteria."}
        </div>
      )}
    </div>
  );
}

export default MovieList;