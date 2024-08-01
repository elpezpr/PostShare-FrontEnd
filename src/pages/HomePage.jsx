// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList'; // Import your PostList component
// import '../styles/HomePage.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:8080/api/posts'); // Adjust API endpoint as needed
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to PostShare</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default HomePage;
