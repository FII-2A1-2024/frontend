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
import ResetPassword from "./pages/ResetPassword.jsx";
import Verify from "./pages/Verify.jsx";
import SearchPage from "./pages/SearchPage.jsx";

import "./index.css";

/* Ciprian 5 apr: routing system
Use <Link to=""> instead of <a href=""> */

const router = createBrowserRouter([
  {
    path: "/main",
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/",
    element: <ConnectPage />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "/verify",
    element: <Verify />,
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
  {
    path: "/searchBy/:searchKey",
    element: <SearchPage />,
  },
  {
    path: "*", // Definim o rută implicită pentru NotFoundPage
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
