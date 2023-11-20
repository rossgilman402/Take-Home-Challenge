import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import Login from "./components/Login/Login.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
      // { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      // { path: "/createPost", element: <CreatePost /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
