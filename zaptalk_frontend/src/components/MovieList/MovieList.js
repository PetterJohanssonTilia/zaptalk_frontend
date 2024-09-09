import React, { useState, useEffect, useCallback, useRef } from 'react';
import api from '../../api/axios';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchMovies = async () => {
    setLoading(true);
    try {
      console.log(`Frontend: Fetching movies for page ${page}...`);
      const response = await api.get('movies/', {
        params: { page: page, limit: 24 }
      });
      console.log('Frontend: Response:', response.data);
      const newMovies = response.data;
      setMovies(prevMovies => [...prevMovies, ...newMovies]);
      setHasMore(newMovies.length > 0);
    } catch (error) {
      console.error('Frontend: Error fetching movies:', error.response || error);
    }
    setLoading(false);
  };

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

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <div 
          key={movie.id} 
          ref={index === movies.length - 1 ? lastMovieElementRef : null}
          className="movie-card"
        >
          <img src={movie.thumbnail} alt={movie.title} />
          <h3>{movie.title}</h3>
          {/* Add more movie info here */}
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default MovieList;