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
  const loadingRef = useRef(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024);

  const lastMovieElementRef = useCallback(node => {
    if (loadingRef.current) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore]);

  const fetchMovies = useCallback(async (resetMovies = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
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
      console.log('Number of new movies:', newMovies.length);
      
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
      setHasMore(false);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [page, selectedGenres, searchTerm, sortBy, showFollowedLikes]);

  useEffect(() => {
    setPage(1);
    setMovies([]);
    setFollowedLikesMovies([]);
    setHasMore(true);
    setError(null);
    fetchMovies(true);
  }, [selectedGenres, searchTerm, sortBy, showFollowedLikes]);
  
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenres(event.target.value ? [event.target.value] : []);
  };

  const toggleSort = (sort) => {
    setSortBy(prevSort => prevSort === sort ? '' : sort);
  };

  const toggleFollowedLikes = () => {
    setShowFollowedLikes(prev => !prev);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const currentMovies = showFollowedLikes ? followedLikesMovies : movies;

  return (
    <div className="container-fluid movie-list-container">
      <div className="row mb-4">
        <div className="row mb-4">
          <h1 className="text-left mb-2 movielist-title">Movies</h1>
          <p className="text-left movielist-breadtext">
            Movies take us to another era, delivering stories that remain unforgettable. So many classics, so much to experience.
          </p>
        </div>
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-6 col-md-6 col-lg-4">
          <input 
            type="text" 
            placeholder="Search movies..." 
            value={searchTerm} 
            onChange={handleSearchChange}
            className="form-control mb-3"
          />
          <select 
            onChange={handleGenreChange}
            className="form-select bg-dark text-white"
          >
            <option value="">Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          <div className="button-group">
            <button 
              onClick={() => toggleSort('most_liked')} 
              className={`btn btn-outline-light ${sortBy === 'most_liked' ? 'active' : ''}`}
              disabled={loadingRef.current}
            >
              {isSmallScreen ? 'Liked' : 'Most Liked'}
            </button>
            <button 
              onClick={() => toggleSort('most_commented')} 
              className={`btn btn-outline-light ${sortBy === 'most_commented' ? 'active' : ''}`}
              disabled={loadingRef.current}
            >
              {isSmallScreen ? 'Commented' : 'Most Commented'}
            </button>
            <button 
              onClick={toggleFollowedLikes} 
              className={`btn btn-outline-light ${showFollowedLikes ? 'active' : ''}`}
              disabled={loadingRef.current}
            >
              Friends favorites
            </button>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-3">
        {currentMovies.map((movie, index) => (
          <div key={movie.id} className="col">
            <div 
              className="card h-100 text-white movie-card" 
              onClick={() => handleMovieClick(movie.id)}
              ref={index === currentMovies.length - 1 ? lastMovieElementRef : null}
              style={{backgroundColor: '#232323'}}
            >
              <img src={movie.thumbnail} className="card-img-top" alt={movie.title} style={{height: '200px', objectFit: 'cover'}} />
              <div className="card-body">
                <h5 className="card-title text-center movie-title">{movie.title}</h5>
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
      {!loading && currentMovies.length === 0 && !error && (
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