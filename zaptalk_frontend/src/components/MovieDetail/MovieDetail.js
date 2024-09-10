import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`movies/${id}/`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to fetch movie details');
      }
    };

    fetchMovie();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await api.post(`likes/toggle_like/`, { movie_id: id });
      if (response.data.is_like) {
        setMovie(prevMovie => ({
          ...prevMovie,
          likes_count: (prevMovie.likes_count || 0) + 1
        }));
      } else {
        setMovie(prevMovie => ({
          ...prevMovie,
          likes_count: Math.max((prevMovie.likes_count || 0) - 1, 0)
        }));
      }
    } catch (error) {
      console.error('Error liking movie:', error);
      setError('Failed to like the movie. Please try again.');
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <img src={movie.thumbnail} alt={movie.title} />
      <p>Year: {movie.year}</p>
      <p>Genres: {movie.genres.join(', ')}</p>
      <p>Likes: {movie.likes_count || 0}</p>
      <button onClick={handleLike}>Like</button>
      <p>{movie.extract}</p>
    </div>
  );
}

export default MovieDetail;