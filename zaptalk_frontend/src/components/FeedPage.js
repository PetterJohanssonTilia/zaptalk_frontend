import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { format } from 'date-fns';

function FeedPage() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedItems = async () => {
      try {
        const [commentsResponse, likesResponse] = await Promise.all([
          api.get('comments/'),
          api.get('likes/')
        ]);

        const comments = commentsResponse.data.map(comment => ({
          ...comment,
          type: 'comment'
        }));

        const likes = likesResponse.data.map(like => ({
          ...like,
          type: 'like'
        }));

        const combinedFeed = [...comments, ...likes].sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );

        setFeedItems(combinedFeed);
        setLoading(false);
      } catch (err) {
        console.error('Error details:', err.response || err);
        setError('Failed to fetch feed items: ' + (err.response?.data?.detail || err.message));
        setLoading(false);
      }
    };

    fetchFeedItems();
  }, []);

  const MovieThumbnail = ({ src, alt }) => {
    const [imageError, setImageError] = useState(false);

    if (!src || imageError) {
      return null;
    }

    return (
      <img 
        src={src}
        alt={alt}
        className="w-16 h-16 object-cover rounded mr-2"
        onError={() => setImageError(true)}
      />
    );
  };

  const renderFeedItem = (item) => {
    let movieDetails = item.movie_details;
    let movieTitle = item.type === 'like' ? item.movie_title : (movieDetails ? movieDetails.title : null);
    
    return (
      <div key={`${item.type}-${item.id}`} className="bg-white p-4 mb-4 rounded-lg shadow flex">
        <div className="flex-shrink-0 mr-4">
          <img 
            src={item.user.avatar || '/default-avatar.png'} 
            alt={`${item.user.username}'s avatar`} 
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center mb-2">
            <Link to={`/profile/${item.user.username}`} className="font-bold text-blue-600 hover:underline mr-2">
              {item.user.username}
            </Link>
            <span className="text-gray-500">
              {item.type === 'comment' ? 'commented on' : 'liked'}
            </span>
          </div>
          {movieDetails && (
            <div className="flex items-center mb-2">
              <MovieThumbnail 
                src={movieDetails.thumbnail}
                alt={`${movieTitle} thumbnail`}
              />
              <Link to={`/movie/${movieDetails.id}`} className="font-bold text-blue-600 hover:underline">
                {movieTitle}
              </Link>
            </div>
          )}
          {item.type === 'comment' && (
            <p className="mt-2">{item.content}</p>
          )}
          {item.type === 'like' && item.content_type === 'comment' && (
            <p className="mt-2">Liked a comment: "{item.content_object.content}"</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            {format(new Date(item.created_at), 'PPpp')}
          </p>
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Feed</h1>
      {feedItems.length === 0 ? (
        <p>No feed items to display.</p>
      ) : (
        feedItems.map(renderFeedItem)
      )}
    </div>
  );
}

export default FeedPage;