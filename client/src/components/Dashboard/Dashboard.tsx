import React, { useState } from "react";
import "./Dashboard.css";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../utils/query";
import Auth from "../../utils/auth";
import JSZip from "jszip";

//Type for the data within a post
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

//The type for the return when calling getPosts
interface GetPostsData {
  getPosts: Post[];
}

const Dashboard: React.FC = () => {
  //State to keep track of the asc or desc and the search input and the selected posts
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  //Initalize the GET POST so that we can render to the page
  const { loading, error, data } = useQuery<GetPostsData>(GET_POSTS);

  //Show the loading until the data has been retrieved
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching posts:", error);
    return <p>Error fetching posts</p>;
  }

  //get the posts using optional chaining just incase we get null
  const posts = data?.getPosts || [];

  //Filter the posts depending on the user input in the textboxs
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      post.description.toLowerCase().includes(searchInput.toLowerCase())
  );

  //Sort the posts based on the the drop down menu for asc and desc
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const compareFieldA = a.title;
    const compareFieldB = b.title;

    if (sortOrder === "asc") {
      return compareFieldA.localeCompare(compareFieldB);
    } else {
      return compareFieldB.localeCompare(compareFieldA);
    }
  });

  //This will change the selected posts depending if the post checkbox is selected
  //If the checkbox is already selected then we want to unselect and remove from state
  const toggleSelection = (postId: string) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };

  //If the user clicks selected all we want to setSelected to every post ID
  const handleSelectAll = () => {
    const allPostIds = sortedPosts.map((post) => post._id);
    setSelectedPosts(allPostIds);
  };

  //Empty the selected posts if the user clicks the clear button
  const handleClearSelection = () => {
    setSelectedPosts([]);
  };

  //using the jszip package so that the user can download all of the pictures they desire inside a zip file
  const handleDownload = async () => {
    const zip = new JSZip();

    //Map through all of the posts within selected
    await Promise.all(
      selectedPosts.map(async (postId) => {
        const post = sortedPosts.find((p) => p._id === postId);

        if (post && post.url) {
          try {
            const response = await fetch(post.url);
            const arrayBuffer = await response.arrayBuffer();

            zip.file(`${post.title}.jpg`, arrayBuffer);
          } catch (error) {
            console.error(`Error downloading image for post ${postId}:`, error);
          }
        }
      })
    );

    zip.generateAsync({ type: "blob" }).then((content) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "selected_images.zip";

      link.click();
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

      <div className="selection-buttons">
        <button onClick={handleSelectAll}>Select All</button>
        <button onClick={handleClearSelection}>Clear Selection</button>
      </div>
      <button onClick={handleDownload} disabled={selectedPosts.length === 0}>
        Download Selected
      </button>
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
    </div>
  );
};

export default Dashboard;
