import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { GET_USER_DATA } from "../../utils/query";
import "./Profile.css";
import CreatePostForm from "../CreatePost/CreatePost";

interface Post {
  _id: string;
  title: string;
  description: string;
  url: string;
  created: string;
}

interface User {
  _id: string;
  posts: Post[];
  username: string;
}

interface GetUserPostsData {
  getSingleUser: User;
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const { loading, error, data } = useQuery<GetUserPostsData>(GET_USER_DATA, {
    variables: { userId },
  });
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { getSingleUser } = data!;

  const handleCreatePostClick = () => {
    setIsCreatingPost(true);
  };

  return (
    <div>
      <h2>Hello {data?.getSingleUser?.username}</h2>
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
      {!isCreatingPost && (
        <button onClick={handleCreatePostClick}>Create a New Post</button>
      )}
      {isCreatingPost && (
        <CreatePostForm
          userId={userId}
          onCancel={() => setIsCreatingPost(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;
