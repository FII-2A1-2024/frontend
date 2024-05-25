// index.js
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
import AccountSettings from "./pages/settings/AccountSettingsPage.jsx";
import LanguageSettings from "./pages/settings/LanguageSettingsPage.jsx";
import "./i18n.js";
import { MessageProvider } from "./components/Messages/MessageContext.jsx";

import "./index.css";

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
    element: <AccountSettings />,
    children: [
      {
        path: "/settings/languages",
        element: <LanguageSettings />,
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
    <MessageProvider>
      <RouterProvider router={router} />
    </MessageProvider>
  </React.StrictMode>
);
