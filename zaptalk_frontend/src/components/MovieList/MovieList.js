import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    try {
      const response = await api.get('movies/', {
  params: {
    page: resetMovies ? 1 : page,
    genres: selectedGenres.map(genre => genre.toLowerCase()).join(','),
    search: searchTerm,
    sort: sortBy,
    followed_likes: showFollowedLikes
  }
});
      console.log('Movies response:', response.data);
      const newMovies = response.data.results;
      console.log('Number of movies:', newMovies.length);
      setMovies(prevMovies => resetMovies ? newMovies : [...prevMovies, ...newMovies]);
      setHasMore(response.data.next !== null);
      setError(null);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('An error occurred while fetching movies.');
    } finally {
      setLoading(false);
    }
  }, [page, selectedGenres, searchTerm, sortBy, showFollowedLikes]);

  useEffect(() => {
    fetchMovies(true);
  }, [selectedGenres, searchTerm, sortBy, showFollowedLikes]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(false);
    }
  }, [page]);

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

  const handleGenreChange = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  const toggleFollowedLikes = () => {
    setShowFollowedLikes(prev => !prev);
    setPage(1);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="movie-list-container">
      <h1>Movies</h1>
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search movies..." 
          value={searchTerm} 
          onChange={handleSearchChange}
        />
        <select onChange={handleSortChange} value={sortBy}>
          <option value="">Sort by...</option>
          <option value="most_liked">Most Liked</option>
          <option value="most_commented">Most Commented</option>
          <option value="genres">By Selected Genres</option>
        </select>
        <button onClick={toggleFollowedLikes}>
          {showFollowedLikes ? 'Show All' : 'Show Liked by Followed Users'}
        </button>
        <div className="genre-filters">
          {genres.map(genre => (
            <label key={genre} className="genre-checkbox">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
              {genre}
            </label>
          ))}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="movie-grid">
        {movies.map((movie, index) => (
          <div 
            key={movie.id} 
            className="movie-card" 
            onClick={() => handleMovieClick(movie.id)}
            ref={index === movies.length - 1 ? lastMovieElementRef : null}
          >
            <img src={movie.thumbnail} alt={movie.title} />
            <h3>{movie.title}</h3>
            {movie.likes_count !== undefined && <p>Likes: {movie.likes_count}</p>}
          </div>
        ))}
      </div>

      {loading && <div className="loading">Loading...</div>}
      {!loading && movies.length === 0 && (
        <div className="no-results">No movies found matching your criteria.</div>
      )}
    </div>
  );
}

export default MovieList;