import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

const DEFAULT_AVATAR = 'https://res.cloudinary.com/dumvsoykz/image/upload/v1724754182/default_profile_yvdjcm.jpg';

function MoviesPage() {
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieAndComments = async () => {
      try {
        const [movieResponse, commentsResponse] = await Promise.all([
          api.get(`movies/${id}/`),
          api.get(`movies/${id}/comments/`)
        ]);
        setMovie(movieResponse.data);
        setComments(commentsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to fetch movie details: ' + (err.response?.data?.detail || err.message));
        setLoading(false);
      }
    };

    fetchMovieAndComments();
  }, [id]);

  const getAvatarUrl = (publicId) => {
    if (!publicId) return DEFAULT_AVATAR;
    return `https://res.cloudinary.com/dumvsoykz/image/upload/c_thumb,g_face,h_50,w_50/${publicId}`;
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!movie) return <div className="text-center p-4">Movie not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <p className="text-gray-600 mb-6">{movie.description}</p>
      
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center mb-2">
                <img
                  src={getAvatarUrl(comment.user.avatar)}
                  alt={`${comment.user.username}'s avatar`}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <Link to={`/profile/${comment.user.username}`} className="font-semibold text-blue-600 hover:underline">
                    {comment.user.username}
                  </Link>
                  {/* Note: We're not displaying followers count and likes here as they're not in the serializer */}
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted on: {new Date(comment.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  );
}

export default MoviesPage;