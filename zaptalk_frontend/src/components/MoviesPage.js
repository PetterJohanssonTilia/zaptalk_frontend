import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/axios';

function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('Frontend: Fetching movies...');
        const response = await api.get('movies/');
        console.log('Frontend: Response:', response.data);
        setMovies(response.data);
      } catch (error) {
        console.error('Frontend: Error fetching movies:', error.response || error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
}

export default MoviesPage;