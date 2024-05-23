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
import AccountSettingsPage from "./pages/AccountSettingsPage.jsx";
import LandingPageF from "./pages/LandingPageF.jsx";
import LandingPageSaved from "./pages/LandingPageSaved.jsx";
import UserAccount from "./pages/UserAccountPage.jsx";
import "./i18n.js";
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
    path: "/settings",
    element: <AccountSettingsPage />
  },
  {
    path: "/rules",
    element: <RulesPage />,
  },
  {
    path: "/post/:postId",
    element: <PostPage />,
  },
  {
    path: "/main/:category",
    element: <LandingPageF />,
  },
  {
    path: "/main/saved",
    element: <LandingPageSaved />,
  },
  {
    path: "/searchBy/:searchKey",
    element: <SearchPage />,
  },
  {
    path: "*", // Definim o rută implicită pentru NotFoundPage
    element: <NotFoundPage />,
  },
  {
    path: "/useraccount",
    element: <UserAccount />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
