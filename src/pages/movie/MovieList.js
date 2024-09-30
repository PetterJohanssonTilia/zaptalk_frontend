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
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024);
  const [isSearchValid, setIsSearchValid] = useState(true);
  const navigate = useNavigate();
  const observer = useRef();
  const loadingRef = useRef(false);

  const lastMovieElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchMovies = useCallback(async (pageToFetch, shouldAppend = false) => {
    if (loadingRef.current || (searchTerm.length > 0 && searchTerm.length < 3)) return;
    loadingRef.current = true;
    setLoading(true);
    const params = {
      page: pageToFetch,
      genres: selectedGenres.map((genre) => genre.toLowerCase()).join(','),
      search: searchTerm,
      sort: sortBy,
      ...(showFollowedLikes && { followed_likes: true }),
    };
    const url = `movies/?${new URLSearchParams(params)}`;
    try {
      const response = await api.get(url);
      const newMovies = response.data.results.filter(movie => 'thumbnail' in movie && movie.thumbnail);

      setMovies((prevMovies) => {
        const updatedMovies = shouldAppend ? [...prevMovies, ...newMovies] : newMovies;
        return updatedMovies;
      });
      setHasMore(newMovies.length > 0 && response.data.next !== null);
      setError(null);
    } catch (errorMessage) {
      setError('An error occurred while fetching movies.');
      setHasMore(false);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [selectedGenres, searchTerm, sortBy, showFollowedLikes]);

  useEffect(() => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
    setError(null);
    fetchMovies(1, false);
  }, [selectedGenres, searchTerm, sortBy, showFollowedLikes, fetchMovies]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page, true);
    }
  }, [page, fetchMovies]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get('genres/');
        setGenres(response.data);
      } catch (errorMessage) {
        setError('Failed to fetch genres. Please try again later.');
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
    const value = event.target.value;
    setSearchTerm(value);
    setIsSearchValid(value.length === 0 || value.length >= 3);
  };

  const handleGenreChange = (event) => {
    setSelectedGenres(event.target.value ? [event.target.value] : []);
  };

  const toggleSort = (sort) => {
    setSortBy((prevSort) => (prevSort === sort ? '' : sort));
  };

  const toggleFollowedLikes = () => {
    setShowFollowedLikes((prev) => !prev);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container-fluid movie-list-container p-0">
      <div className="background-container">
        <div className="row mb-4">
          <div className="col-12">
            <div className="title-section">
              <h1 className="mb-2 movielist-title">Movies</h1>
              <p className="movielist-breadtext">
                Movies take us to another era, delivering stories that remain unforgettable. 
                So many classics, so much to experience.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="search-filter-section">
              <label htmlFor="movie-search" className="form-label visually-hidden">Search movies</label>
              <input
                id="movie-search"
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={`form-control mb-3 ${!isSearchValid ? 'invalid-search' : ''}`}
              />
              <select
                onChange={handleGenreChange}
                className="form-select bg-dark text-white mb-3"
              >
                <option value="">Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              <div className="button-group">
                <button
                  type="button"
                  onClick={() => toggleSort('most_liked')}
                  className={`btn btn-outline-light ${sortBy === 'most_liked' ? 'bg-clicked' : ''}`}
                  disabled={loading}
                >
                  {isSmallScreen ? 'Liked' : 'Most Liked'}
                </button>
                <button
                  type="button"
                  onClick={() => toggleSort('most_commented')}
                  className={`btn btn-outline-light ${sortBy === 'most_commented' ? 'bg-clicked' : ''}`}
                  disabled={loading}
                >
                  {isSmallScreen ? 'Commented' : 'Most Commented'}
                </button>
                <button
                  type="button"
                  onClick={toggleFollowedLikes}
                  className={`btn btn-outline-light ${showFollowedLikes ? 'bg-clicked' : ''}`}
                  disabled={loading}
                >
                  Friends favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 mx-1">
        {movies.map((movie, index) => (
          <div key={movie.id} className="col">
            <div className="movie-card-wrapper">
              <div
                className="card h-100 text-white movie-card"
                onClick={() => handleMovieClick(movie.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleMovieClick(movie.id);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <img src={movie.thumbnail} className="card-img-top movie-thumbnail" alt={movie.title} />
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
          </div>
        ))}
      </div>

      {hasMore && (
        <div ref={lastMovieElementRef} className="text-center my-4">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && movies.length === 0 && !error && isSearchValid && (
        <div className="alert alert-info mt-4">
          {showFollowedLikes
            ? 'No movies liked by users you follow.'
            : 'No movies found matching your criteria.'}
        </div>
      )}
    </div>
  );
}

export default MovieList;