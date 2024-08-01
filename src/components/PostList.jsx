import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  // Define the fetchPosts function outside useEffect
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    // Call the fetchPosts function inside useEffect
    fetchPosts();
  }, []); // Empty dependency array means this runs once on mount

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete post: ${errorText}`);
      }

      setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
      alert('Post deleted successfully!');
    } catch (error) {
      setError(error.message);
      console.error('Error deleting post:', error);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="post-list">
      <h1>All Posts</h1>
      <div className="posts-container">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
              <p>{post.content.slice(0, 100)}...</p>
            </Link>
            <button onClick={() => handleDelete(post.id)}>Delete Post</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
