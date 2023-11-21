import React, { useState } from "react";
import "./Dashboard.css";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../utils/query";
import Auth from "../../utils/auth";

//Types for the data within a post
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

//The type for results when calling getPosts
interface GetPostsData {
  getPosts: Post[];
}

const Dashboard: React.FC = () => {
  //State so that we can store input, posts that are checked off and which order is selected
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  //Initalizing the useQuery for getting all of the posts to be rendered on the page
  const { loading, error, data } = useQuery<GetPostsData>(GET_POSTS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching posts:", error);
    return <p>Error fetching posts</p>;
  }

  const posts = data?.getPosts || [];

  //We want to filer the posts based on what the user inputs
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      post.description.toLowerCase().includes(searchInput.toLowerCase())
  );

  //We want to sort the post by asc or desc
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const compareFieldA = a.title;
    const compareFieldB = b.title;

    if (sortOrder === "asc") {
      return compareFieldA.localeCompare(compareFieldB);
    } else {
      return compareFieldB.localeCompare(compareFieldA);
    }
  });

  //When a certain card is checked off it is added to the selectedPosts state so that we can eventually download
  //If the post is already selected we want to find it in selected posts state and uncheck it
  const toggleSelection = (postId: string) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };

  const handleDownload = () => {
    selectedPosts.forEach((postId) => {
      const post = sortedPosts.find((p) => p._id === postId);

      if (post && post.url) {
        // Create a temporary anchor element
        const link = document.createElement("a");
        link.href = post.url;
        link.download = `${post.title}.jpg`; // You can customize the filename here

        // Trigger a click event on the anchor element
        link.click();
      }
    });
  };

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
              <input
                type="checkbox"
                checked={selectedPosts.includes(post._id)}
                onChange={() => toggleSelection(post._id)}
              />
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
      <button onClick={handleDownload} disabled={selectedPosts.length === 0}>
        Download Selected
      </button>
    </div>
  );
};

export default Dashboard;
