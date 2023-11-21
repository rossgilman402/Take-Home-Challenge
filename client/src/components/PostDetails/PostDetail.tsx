import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ONE_POST } from "../../utils/query";
import { DELETE_POST, EDIT_POST } from "../../utils/mutations";
import "./PostDetail.css";
import EditPost from "../EditPost/EditPost";

//The types for the data within a post
interface Post {
  _id: string;
  title: string;
  description: string;
  url: string;
  created: string;
}

//Types for what is returned in getSinglePost
interface PostData {
  getSinglePost: Post;
}

const PostDetailPage: React.FC = () => {
  //Get the postID from the parameters in the URL
  const { postId } = useParams<{ postId: string }>();

  //Getting the data from the post that we are looking at using the POSTID from useParams
  const { loading, error, data } = useQuery<PostData>(GET_ONE_POST, {
    variables: { postId },
  });

  //Declaring the deletePost useMutation so that when the delete button is clicked the post is deleted
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_ONE_POST, variables: { postId } }],
  });

  //Declaring the editPost useMutation so that when the editPost component is called the onSave function can edit the post
  const [editPost] = useMutation(EDIT_POST, {
    refetchQueries: [{ query: GET_ONE_POST, variables: { postId } }],
  });

  //State to render the edit form component if the state is set to true
  const [isEditing, setIsEditing] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error || !data?.getSinglePost) return <p>Error: Post not found</p>;

  const currentPost: Post = data.getSinglePost;

  //Call the deletePost method when the delete button is clicked
  const handleDelete = async () => {
    try {
      await deletePost({
        variables: { postId: currentPost._id },
      });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  //Open the edit form component
  const handleEdit = () => {
    setIsEditing(true);
  };

  //Close the edit form component with no changes
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  //Passed into the edit form so that the edit form can pass in the user input for changes
  const handleSaveEdit = async (editedData: {
    title: string;
    description: string;
    url: string;
  }) => {
    try {
      await editPost({
        variables: {
          postId: currentPost._id,
          ...editedData,
        },
      });
      //Close the edit form will also create a rerender
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing post:", error);
    }
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
        {isEditing ? (
          <EditPost
            postId={postId}
            onCancel={handleCancelEdit}
            onSave={handleSaveEdit}
          />
        ) : (
          <div>
            <button onClick={handleEdit} className="edit-button">
              Edit
            </button>
            <button onClick={handleDelete} className="delete-button">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
