import React, { useState } from "react";
import "./Dashboard.css";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../utils/query";
import Auth from "../../utils/auth";

// Define what a post and post data will return
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

const Dashboard: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchInput, setSearchInput] = useState<string>("");

  // Use the useQuery hook to execute the GET_POSTS query
  const { loading, error, data } = useQuery<GetPostsData>(GET_POSTS);

  // Display loading until the page is ready to show the full render
  if (loading) {
    return <p>Loading...</p>;
  }

  // Return an error to the page if the posts are unable to be fetched
  if (error) {
    console.error("Error fetching posts:", error);
    return <p>Error fetching posts</p>;
  }

  // Create a variable to store posts or empty if null
  // ? is for optional chaining that allows accessing data even if it can be null
  const posts = data?.getPosts || [];
  console.log(posts);

  // Filter posts based on search input
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      post.description.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Sort posts based on user-selected options
  //Use localeCompare to sort the list
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const compareFieldA = a.title;
    const compareFieldB = b.title;

    if (sortOrder === "asc") {
      return compareFieldA.localeCompare(compareFieldB);
    } else {
      return compareFieldB.localeCompare(compareFieldA);
    }
  });

  return (
    <div className="post-list-container">
      <h1>Dashboard</h1>
      <div className="sort-section">
        <label>
          Order:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </label>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {Auth.loggedIn() ? (
        <div className="post-cards-container">
          {sortedPosts.map((post) => (
            <div key={post._id} className="post-card">
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <p>Created by: {post?.user?.username}</p>
              <img className="post-image" src={post.url} alt={post.title} />
              <p>{post.created}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You need to be logged in to see the posts.</p>
      )}
    </div>
  );
};

export default Dashboard;
