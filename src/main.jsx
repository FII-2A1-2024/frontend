import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ConnectPage from './pages/ConnectPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import PostPage from './pages/PostPage.jsx'
import ConversationsPage from './pages/ConversationsPage.jsx'
import ConversationPage from './pages/ConversationPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

import './index.css'

/* Ciprian 5 apr: routing system
Use <Link to=""> instead of <a href=""> 
TODO: If the user is not connected, redirect at "/connect" 
TODO: Redirect the user to the most recent conv if he types manually "/conversation" (without or invalid ID) in the URL*/

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/post/:postId',
    element: <PostPage/>
  },
  {
    path: '/connect',
    element: <ConnectPage/>
  },
  {
    path: '/conversation',
    element: <ConversationsPage/>,
    children: [
      {
        path: '/conversation/:conversationId',
        element: <ConversationPage/>
        /* Ciprian: This can be reverted to be a separate page if needed */
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
