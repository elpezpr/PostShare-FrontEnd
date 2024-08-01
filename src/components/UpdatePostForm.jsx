import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdatePostForm = () => {
  const [postId, setPostId] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'postId') {
      setPostId(value);
    } else {
      setContent(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Fetch the post to check if it exists
      const fetchResponse = await fetch(`http://localhost:8080/api/posts/${postId}`);
      if (!fetchResponse.ok) {
        throw new Error('Failed to fetch post. Ensure the post ID is correct.');
      }

      // If the post exists, update its content
      const response = await fetch(`http://localhost:8080/api/posts/content/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update post: ${errorText}`);
      }

      alert('Post updated successfully!');
      navigate('/'); // Redirect to homepage after submission
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-post-form">
      <h1>Update Post Content</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="postId">Post ID:</label>
          <input
            id="postId"
            name="postId"
            type="text"
            value={postId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdatePostForm;
