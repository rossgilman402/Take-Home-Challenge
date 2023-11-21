// PostDetailPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ONE_POST } from "../../utils/query";
import "./PostDetail.css"; // Import your CSS file

interface Post {
  _id: string;
  title: string;
  description: string;
  url: string;
  created: string;
}

interface PostData {
  getSinglePost: Post;
}

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  const { loading, error, data } = useQuery<PostData>(GET_ONE_POST, {
    variables: { postId },
  });

  if (loading) return <p>Loading...</p>;
  if (error || !data?.getSinglePost) return <p>Error: Post not found</p>;

  const currentPost: Post = data.getSinglePost;

  const handleDelete = () => {
    // Implement the logic to delete the post (you need to handle this on the server side)
    console.log(`Deleting post with ID: ${currentPost._id}`);
    // After deletion, you might want to navigate the user to another page or do something else
  };

  return (
    <div className="post-detail-container">
      <h1>Post Details</h1>
      <div className="post-container">
        <h2 className="post-title">{currentPost.title}</h2>
        <img
          className="post-image"
          src={currentPost.url}
          alt={currentPost.title}
        />
        <p className="post-description">{currentPost.description}</p>
        <p className="post-created">{currentPost.created}</p>
        <button
          // onClick={handleEdit}
          className="edit-button"
        >
          Edit
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostDetailPage;
