import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchMovieAndComments = async () => {
      setIsLoading(true);
      try {
        const movieResponse = await api.get(`movies/${id}/`);
        setMovie(movieResponse.data);

        if (token) {
          const commentsResponse = await api.get('comments/', { 
            params: { movie: id },
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setComments(commentsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching movie details and comments:', error.response || error);
        setError('Failed to fetch movie details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieAndComments();
  }, [id]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      setError('Please log in to like the movie');
      return;
    }
    try {
      const response = await api.post(`likes/toggle_like/`, {
        content_type: 'movie',
        object_id: id
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to post a comment.');
      return;
    }
    
    try {
      const response = await api.post('comments/', {
        movie: id,
        content: newComment
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 201) {
        setComments(prevComments => [...prevComments, response.data]);
        setNewComment('');
        setError(null);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        setError(`Failed to post comment: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        setError('No response received from server. Please try again.');
      } else {
        setError('Error setting up the request. Please try again.');
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <img src={movie.thumbnail} alt={movie.title} />
      <p>Year: {movie.year}</p>
      <p>Genres: {movie.genres.join(', ')}</p>
      <p>Likes: {movie.likes_count}</p>
      <button onClick={handleLike}>Like</button>
      <p>{movie.extract}</p>

      <div className="comments-section">
        <h2>Comments</h2>
        {isLoggedIn ? (
          <>
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="comment">
                  <p><strong>{comment.user.username}</strong>: {comment.content}</p>
                  <small>Posted on: {new Date(comment.created_at).toLocaleString()}</small>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}

            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                required
              />
              <button type="submit">Post Comment</button>
            </form>
          </>
        ) : (
          <p>Please log in to view and post comments.</p>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default MovieDetail;