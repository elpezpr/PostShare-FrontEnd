import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import '../styles/PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:8080/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
