import React, { useState } from "react";

//Types for props that are passed from the PostDetail component
interface EditPostFormProps {
  postId?: string;
  onCancel: () => void;
  onSave: (editedData: {
    title: string;
    description: string;
    url: string;
  }) => void;
}

const EditPostForm: React.FC<EditPostFormProps> = ({ onCancel, onSave }) => {
  //State for user input
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postUrl, setPostUrl] = useState("");

  const handleEditPost = async () => {
    try {
      //The onSave method passed in through props will call the editPostMutation so that
      //The new user input will be saved in the graphQL database
      //Will also rerender and close the edit post component
      onSave({ title: postTitle, description: postDescription, url: postUrl });
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  return (
    <div className="edit-post-form-container">
      <h1>Edit Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditPost();
        }}
      >
        <label>
          Post Title:
          <input
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </label>
        <label>
          Post Description:
          <textarea
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
          />
        </label>
        <label>
          Post URL:
          <input
            type="text"
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
          />
        </label>
        <div className="button-container">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
