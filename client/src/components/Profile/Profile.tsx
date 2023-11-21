import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { GET_USER_DATA } from "../../utils/query";
import "./Profile.css";
import CreatePostForm from "../CreatePost/CreatePost";

//Types for data in a post
interface Post {
  _id: string;
  title: string;
  description: string;
  url: string;
  created: string;
}

//Types for the data in a user
interface User {
  _id: string;
  posts: Post[];
  username: string;
}

//Types for output when getSingleUser is called
interface GetUserPostsData {
  getSingleUser: User;
}

const Profile: React.FC = () => {
  //Get the userID from the params within the URL
  const { userId } = useParams<{ userId: string }>();

  //We want to get the user data so we can render the posts the user has
  const { loading, error, data } = useQuery<GetUserPostsData>(GET_USER_DATA, {
    variables: { userId },
  });

  //State so that we can render the create post component
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { getSingleUser } = data!;

  //Setting the IsCreatingPost will rerender with the create post component
  const handleCreatePostClick = () => {
    setIsCreatingPost(true);
  };

  return (
    <div className="profile-container">
      <h2>Hello {data?.getSingleUser?.username}</h2>
      {!isCreatingPost && (
        <button onClick={handleCreatePostClick}>Create a New Post</button>
      )}
      {isCreatingPost && (
        <CreatePostForm
          userId={userId}
          onCancel={() => setIsCreatingPost(false)}
        />
      )}
      {getSingleUser.posts.length > 0 ? (
        <ul>
          {getSingleUser.posts.map((post) => (
            <li key={post._id}>
              <Link to={`/Post/${post._id}`}>
                <div className="card">
                  <img src={post.url} alt={post.title} />
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <p>Created: {post.created}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found. Create a new post!</p>
      )}
    </div>
  );
};

export default Profile;
