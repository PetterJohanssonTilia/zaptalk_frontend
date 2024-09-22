import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { format, parseISO } from 'date-fns';
import './FeedPage.css';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import defaultAvatar from '../assets/defaultavatar.jpg';

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
        console.error('Error details:', err.response || err);
        setError('Failed to fetch feed items: ' + (err.response?.data?.detail || err.message));
        setLoading(false);
      }
    };

    fetchFeedItems();
  }, []);

  const renderFeedItem = (item) => {
    const formattedDate = format(parseISO(item.created_at), "MMM d, yyyy 'at' h:mm a");

    return (
      <li key={`${item.type}-${item.id}`} className="list-group-item d-flex align-items-center py-3">
        <div className="d-flex flex-column align-items-center me-3 user-column">
          <Link to={`/profile/${item.user.username}`} className="text-decoration-none mt-2">
            <img 
              src={item.user.avatar || defaultAvatar} 
              
              alt={`${item.user.username}'s avatar`} 
              className="rounded-circle avatar"
            />
          </Link>
          <Link to={`/profile/${item.user.username}`} className="text-decoration-none mt-2">
            <span className="username">{item.user.username}</span>
          </Link>
          <small className="text-muted mt-1">{formattedDate}</small>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center action-column">
          {item.type === 'comment' ? (
            <>
              <i className="bi bi-chat-square"></i>
              <span><MessageCircle size={25} className="me-1" /></span>
              <span className="action-text">Commented on</span>              
            </>
          ) : (
            <>
              <i className="bi bi-hand-thumbs-up"></i>
              <span><span><ThumbsUp size={25} className="me-1" /></span></span>
              <span className="action-text">Liked</span>              
            </>
          )}
        </div>
        <div className="d-flex flex-column align-items-center ms-3 movie-column">
          <img 
            src={item.movie_details?.thumbnail || '/default-movie-thumbnail.png'} 
            alt={`${item.movie_details?.title} thumbnail`}
            className="rounded movie-thumbnail"
          />
          <Link to={`/movie/${item.movie_details?.id}`} className="text-decoration-none mt-2 text-center">
            <span className="movie-title">{item.movie_details?.title}</span>
          </Link>
        </div>
      </li>
    );
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-danger">{error}</div>;

  return (
    <div className="container py-4 feed-container">
      <h1 className="mb-4">Feed</h1>
      {feedItems.length === 0 ? (
        <p>No feed items to display.</p>
      ) : (
        <ul className="list-group">
          {feedItems.map(renderFeedItem)}
        </ul>
      )}
    </div>
  );
}

export default FeedPage;