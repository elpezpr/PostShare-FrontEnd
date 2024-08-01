import React, { useState } from 'react';
import '../styles/CommentForm.css'

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const commentData = {
      content: comment,
      post: {
        id: postId
      },
      author: author
    };

    try {
      const response = await fetch('http://localhost:8080/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) throw new Error('Failed to save comment');

      await response.json();
      alert('Comment added successfully!');
      setComment('');
      setAuthor('');
      onCommentAdded(); // Refresh comments on success
    } catch (error) {
      setError('Error adding comment. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="comment-form">
      <h2>Add a Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CommentForm;
