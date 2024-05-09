import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ConnectPage from "./pages/ConnectPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ConversationsPage from "./pages/ConversationsPage.jsx";
import ConversationPage from "./pages/ConversationPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RulesPage from "./pages/RulesPage.jsx";
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
    path: "/conversation",
    element: <ConversationsPage />,
  },
  {
    path: "/conversation/:conversationId",
    element: <ConversationPage />,
    /* This needs to be a child if all convs will be on the left and current conv on the right */
  },
  {
    path: "/rules",
    element: <RulesPage />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
