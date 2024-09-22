import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import './MovieDetail.css'

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
  const [isSuperuser, setIsSuperuser] = useState(false);
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

          const currentUserResponse = await api.get('profiles/me/', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          console.log('Current user profile:', currentUserResponse.data);
          setCurrentUserProfile(currentUserResponse.data);
          setIsSuperuser(currentUserResponse.data.is_superuser);
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

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (!movie) return <div className="text-center mt-5">Movie not found</div>;

  // Function to sort comments by date, newest first
  const sortedComments = [...comments].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="container-fluid p-0 movie-detail">
      <div className="position-relative">
        <img src={movie.thumbnail} alt={movie.title} className="img-fluid w-100 movie-thumbnail" />
        <div className="movie-info-overlay position-absolute top-0 start-0 h-100 w-100 d-flex flex-column justify-content-center text-white p-4">
          <h1 className="display-4 fw-bold">{movie.title}</h1>
          <p className="fs-5">{movie.year}</p>
          <p className="fs-6">{movie.genres.join(', ')}</p>
          <p className="mt-3">{movie.extract}</p>
        </div>
      </div>

      {/* Mobile view for movie info */}
      <div className="d-md-none text-white bg-dark p-4">
        <h1 className="h2 fw-bold">{movie.title}</h1>
        <p>{movie.year}</p>
        <p>{movie.genres.join(', ')}</p>
        <p className="mt-3">{movie.extract}</p>
      </div>

      <div className="d-flex justify-content-center align-items-center my-4">
        <p className="me-4 mb-0">
          <ThumbsUp size={24} className="me-2" />
          {movie.likes_count}
        </p>
        <button onClick={handleLike} className="btn btn-dark text-white">Like</button>
      </div>

      <div className="comments-section mt-5">
        <h2 className="text-center mb-4">Comments</h2>
        {isLoggedIn ? (
          <>
            <form onSubmit={handleCommentSubmit} className="mb-4 comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                required
                className="form-control mb-2"
              />
              <button type="submit" className="btn btn-dark text-white d-block ms-auto">Post Comment</button>
            </form>

            {sortedComments.length > 0 ? (
              sortedComments.map(comment => (
                <div key={comment.id} className="comment mb-4">
                  {editingComment && editingComment.id === comment.id ? (
                    <div>
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="form-control mb-2"
                      />
                      <button onClick={handleUpdateComment} className="btn btn-dark text-white btn-sm me-2">Save</button>
                      <button onClick={() => setEditingComment(null)} className="btn btn-secondary btn-sm">Cancel</button>
                    </div>
                  ) : (
                    <div className="d-flex flex-column flex-md-row">
                      <div className="me-md-4 mb-3 mb-md-0 text-center">
                        <Link to={`/profile/${comment.user.username}`}>
                          <img 
                            src={comment.user.avatar || DEFAULT_AVATAR}
                            alt={`${comment.user.username}'s avatar`} 
                            className="rounded-circle mb-2 comment-avatar"
                            onError={(e) => {
                              console.error(`Error loading avatar for ${comment.user?.username}:`, e);
                              e.target.src = DEFAULT_AVATAR;
                            }}
                          />
                        </Link>
                        <div className="fw-bold">{comment.user.username}</div>
                        <div className="small">{new Date(comment.created_at).toLocaleDateString()}</div>
                      </div>
                      <div className="flex-grow-1">
                        <p>{comment.content}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            {currentUserProfile && currentUserProfile.username !== comment.user.username && (
                              <button onClick={() => handleLikeComment(comment.id)} className="btn btn-dark text-white btn-sm me-2">
                                <ThumbsUp size={16} className="me-1" />
                                {comment.is_liked_by_user ? 'Unlike' : 'Like'}
                              </button>
                            )}
                            <span className="small">
                              <ThumbsUp size={16} className="me-1" />
                              {comment.likes_count}
                            </span>
                          </div>
                          {(currentUserProfile && currentUserProfile.username === comment.user.username) || isSuperuser ? (
                            <div>
                              {currentUserProfile.username === comment.user.username && (
                                <button onClick={() => handleEditComment(comment)} className="btn btn-link btn-sm p-0 me-2">Edit</button>
                              )}
                              <button onClick={() => handleDeleteComment(comment.id)} className="btn btn-link btn-sm p-0 text-danger">Delete</button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center">No comments yet.</p>
            )}
          </>
        ) : (
          <p className="text-center">Please log in to view and post comments.</p>
        )}
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default MovieDetail;