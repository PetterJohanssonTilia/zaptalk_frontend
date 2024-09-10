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
      const response = await api.post(`likes/toggle_like/`, {
        content_type: 'movie',
        object_id: id
      });
      setMovie(prevMovie => ({
        ...prevMovie,
        likes_count: response.data.likes_count
      }));
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
      <p>Likes: {movie.likes_count}</p>
      <button onClick={handleLike}>Like</button>
      <p>{movie.extract}</p>
    </div>
  );
}

export default MovieDetail;