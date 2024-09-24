import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { format, parseISO } from 'date-fns';
import './FeedPage.css';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import defaultAvatar from '../../assets/defaultavatar.jpg';

function FeedPage() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedItems = async () => {
      try {
        const response = await api.get('profiles/feed/');
        setFeedItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('You need to be logged in to see your feed.');
        setLoading(false);
      }
    };

    fetchFeedItems();
  }, []);

  const renderFeedItem = (item) => {
    const formattedDate = format(parseISO(item.created_at), "MMM d, yyyy 'at' h:mm a");

    return (
      <div key={`${item.type}-${item.id}`} className="col-12 col-md-4 mb-4">
        <div className="feed-item">
          <Link to={`/movie/${item.movie_details?.id}`} className="movie-link">
            <div className="movie-thumbnail-container">
              <img 
                src={item.movie_details?.thumbnail || '/default-movie-thumbnail.png'} 
                alt={`${item.movie_details?.title} thumbnail`}
                className="movie-thumbnail"
              />
            </div>
            <h5 className="movie-title mt-3 mb-4 text-center">{item.movie_details?.title}</h5>
          </Link>
          <div className="d-flex justify-content-evenly">
            <div className="user-info">
              <Link to={`/profile/${item.user.username}`} className="text-decoration-none">
                <img 
                  src={item.user.avatar || defaultAvatar} 
                  alt={`${item.user.username}'s avatar`} 
                  className="avatar"
                />
                <p className="username mt-1 mb-0">{item.user.username}</p>
              </Link>
            </div>
            <div className="action-info text-end">
              {item.type === 'comment' ? (
                <MessageCircle size={25} className="mb-1" />
              ) : (
                <ThumbsUp size={25} className="mb-1" />
              )}
              <p className="action-text mb-1">{item.type === 'comment' ? 'Commented on' : 'Liked'}</p>
              <small className="text-muted">{formattedDate}</small>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-danger">{error}</div>;

  return (
    <div className="container py-4 feed-container">
      <h1 className="mb-4 text-center">Feed</h1>
      {feedItems.length === 0 ? (
        <p>No feed items to display.</p>
      ) : (
        <div className="row">
          {feedItems.map(renderFeedItem)}
        </div>
      )}
    </div>
  );
}

export default FeedPage;