import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ConnectPage from "./pages/ConnectPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import MessagesPage from "./pages/MessagesPage.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RulesPage from "./pages/RulesPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import Verify from "./pages/Verify.jsx";

import "./index.css";

/* Ciprian 5 apr: routing system
Use <Link to=""> instead of <a href=""> 
TODO: If the user is not connected, redirect at "/connect" */

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/connect",
    element: <ConnectPage />,
  },
  {
    path: "/messages",
    element: <MessagesPage />,
    children: [
      {
        path: "/messages/:messageId",
        element: <MessagePage />,
      },
    ],
  },
  {
    path: "/rules",
    element: <RulesPage />,
  },
  {
    path: "/post/:postId",
    element: <PostPage />,
    /*render: ({ match }) => {
      console.log("Match varibale", match);
      const { id } = match.params;
      return <PostPage postId={id} />;
    }*/
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
