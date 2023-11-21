import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import Login from "./components/Login/Login.tsx";
import About from "./components/About/About.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Profile from "./components/Profile/Profile.tsx";
import PostDetails from "./components/PostDetails/PostDetail.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//This is page routing so that when a user goes to a certain route
// ex) localhost:3000/login the login page will be rendered
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <App />
      </div>
    ),
    children: [
      { index: true, element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/Dashboard", element: <Dashboard /> },
      { path: "/Profile/:userId", element: <Profile /> },
      { path: "/Post/:postId", element: <PostDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
