import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/AddPostForm.css';

const AddPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Post added successfully!');
      setFormData({
        title: '',
        content: '',
        author: '',
      });
      navigate('/'); // Redirect to homepage
    } else {
      alert('Error adding post. Please try again.');
    }
  };

  return (
    <div className="add-post-form">
      <h1>Add a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPostForm;
