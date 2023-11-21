import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST_TO_USER } from "../../utils/mutations";
import "./CreatePost.css";

//Type for the Props that will be taken in from the profile page so that a new post can be created
interface CreatePostFormProps {
  userId?: string;
  onCancel: () => void;
}

const CreatePost: React.FC<CreatePostFormProps> = ({
  userId = "",
  onCancel,
}) => {
  //State to store the information that the user will type in
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postUrl, setPostUrl] = useState("");

  // Use the useMutation hook and ADD_POST_TO_USER to create a new post and append it to the user
  const [addPostToUser] = useMutation(ADD_POST_TO_USER);

  console.log(userId);
  const handleCreatePost = async () => {
    //If the data is entered by the user then we can add to the posts
    if (userId && postTitle && postDescription && postUrl) {
      try {
        // We need to use the current date that the post is made to add to the post
        // Organize the date format so that it matches the fetching
        const currentDate = new Date()
          .toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short",
          })
          .replace(/,/g, "");

        //Use the addPostToUser method to create more posts for the page
        const { data } = await addPostToUser({
          variables: {
            userId: userId,
            title: postTitle,
            description: postDescription,
            url: postUrl,
            created: currentDate,
          },
        });

        console.log(data);

        //Reload the page so that we have a rerender with the newly created post
        window.location.reload();
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  return (
    <div className="create-post-form-container">
      <h1>Create a New Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreatePost();
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
          <button type="submit">Create Post</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
