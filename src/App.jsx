import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostDetail from './components/PostDetail'; // Corrected import
import AddPostForm from './components/AddPostForm'; // Corrected import
import UpdatePostForm from './components/UpdatePostForm';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/add-post" element={<AddPostForm />} />
        <Route path="/update-post/:postId" element={<UpdatePostForm />} />
      </Routes>
    </Router>
  );
};

export default App;