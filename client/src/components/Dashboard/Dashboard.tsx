import React from "react";
import "./Dashboard.css";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../utils/query";

//Define what a post and post data will return
interface Post {
  _id: string;
  title: string;
  description: string;
  url: string;
  created: string;
  user: {
    username: string;
  };
}

interface GetPostsData {
  getPosts: Post[];
}

const Home: React.FC = () => {
  // Use the useQuery hook to execute the GET_POSTS query
  const { loading, error, data } = useQuery<GetPostsData>(GET_POSTS);

  //Display loading until page is ready to show full render
  if (loading) {
    return <p>Loading...</p>;
  }

  //Return an error to the page if the posts are unable to be fetched
  if (error) {
    console.error("Error fetching posts:", error);
    return <p>Error fetching posts</p>;
  }

  //Create a variable to store posts or empty if null
  //? is for optional chaining that allows to access data even if it can be null
  const posts = data?.getPosts || [];
  console.log(posts);

  return (
    <div className="post-list-container">
      <h1>Dashboard</h1>
      <div className="post-cards-container">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>Created by: {post?.user?.username}</p>
            <img className="post-image" src={post.url} alt={post.title} />
            <p>{post.created}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
