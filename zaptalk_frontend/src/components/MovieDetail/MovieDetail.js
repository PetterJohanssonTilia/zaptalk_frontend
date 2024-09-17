import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';

const DEFAULT_AVATAR = 'https://res.cloudinary.com/dumvsoykz/image/upload/v1724754182/default_profile_yvdjcm.jpg';

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
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
          console.log('Comments:', commentsResponse.data);

          const profilesResponse = await api.get('profiles/', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          console.log('Profiles response:', profilesResponse.data);
          setCurrentUserProfile(profilesResponse.data[0]);
          
          const currentUserResponse = await api.get('profiles/me/', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          console.log('Current user profile:', currentUserResponse.data);
          setCurrentUserProfile(currentUserResponse.data);
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
  
  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setEditedContent(comment.content);
  };

  const handleUpdateComment = async () => {
    try {
      const response = await api.put(`comments/${editingComment.id}/`, {
        content: editedContent
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setComments(prevComments =>
          prevComments.map(c =>
            c.id === editingComment.id ? { ...c, content: editedContent } : c
          )
        );
        setEditingComment(null);
        setEditedContent('');
        setError(null);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      setError('Failed to update comment. Please try again.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await api.delete(`comments/${commentId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 204) {
        setComments(prevComments => prevComments.filter(c => c.id !== commentId));
        setError(null);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError('Failed to delete comment. Please try again.');
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const response = await api.post('likes/toggle_like/', {
        content_type: 'comment',
        object_id: commentId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        setComments(prevComments =>
          prevComments.map(comment =>
            comment.id === commentId
              ? {
                  ...comment,
                  likes_count: response.data.likes_count,
                  is_liked_by_user: response.data.is_liked
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      setError('Failed to like/unlike comment. Please try again.');
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
                  {/* NEW: Add edit functionality */}
                  {editingComment && editingComment.id === comment.id ? (
                    <div>
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />
                      <button onClick={handleUpdateComment}>Save</button>
                      <button onClick={() => setEditingComment(null)}>Cancel</button>
                    </div>
                  ) : (
                    <>
                      <Link to={`/profile/${comment.user.username}`}>
                        <img 
                          src={comment.user.avatar || DEFAULT_AVATAR}  // Check if avatar exists
                          alt={`${comment.user.username}'s avatar`} 
                          className="w-12 h-12 rounded-full object-cover comment-avatar"
                          onError={(e) => {
                            console.error(`Error loading avatar for ${comment.user?.username}:`, e);
                            e.target.src = DEFAULT_AVATAR;  // Fallback to default if image fails to load
                          }}
                        />
                      </Link>
                      <p><strong>{comment.user.username}</strong>: {comment.content}</p>
                      <small>Posted on: {new Date(comment.created_at).toLocaleString()}</small>
                      <div>
                        {currentUserProfile && currentUserProfile.username !== comment.user.username && (
                          <button onClick={() => handleLikeComment(comment.id)}>
                            {comment.is_liked_by_user ? 'Unlike' : 'Like'}
                          </button>
                        )}
                        <span> {comment.likes_count} likes</span>
                      </div>
                      {/* NEW: Add edit and delete buttons for user's own comments */}
                      {console.log('Rendering comment:', comment)}
                      {console.log('Current user profile in render:', currentUserProfile)}
                      {console.log('Is current user the comment author?', currentUserProfile?.username === comment.user.username)}
                      {currentUserProfile && currentUserProfile.username === comment.user.username && (
                        <div>
                          <button onClick={() => handleEditComment(comment)}>Edit</button>
                          <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                        </div>
                      )}
                    </>
                  )}
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