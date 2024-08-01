import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import '../styles/PostDetail.css';
import CommentForm from './CommentForm';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postResponse = await fetch(`http://localhost:8080/api/posts/${postId}`);
        if (!postResponse.ok) throw new Error('Failed to fetch post');
        const postData = await postResponse.json();
        setPost(postData);
  
        const commentsResponse = await fetch(`http://localhost:8080/api/posts/${postId}/comments`);
        if (!commentsResponse.ok) {
          // Handle error or set comments to empty array
          console.error('Failed to fetch comments');
          setComments([]); // Or handle error differently
        } else {
          const commentsData = await commentsResponse.json();
          setComments(commentsData);
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };
  
    fetchPostDetails();
  }, [postId]);;

  const refreshComments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const commentsData = await response.json();
      setComments(commentsData);   

    } catch (error) {
      setError(error.message);
      console.error('Error fetching comments:', error);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail-page">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div className="post-author">Author: {post.author}</div>
      <CommentForm postId={postId} onCommentAdded={refreshComments} />
      <div className="comments-section">
        <h2>Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <p>{comment.content}</p>
              <small>By: {comment.author}</small>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
