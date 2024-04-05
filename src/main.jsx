import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ConnectPage from './pages/ConnectPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ConversationsPage from './pages/ConversationsPage.jsx'
import ConversationPage from './pages/ConversationPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/connect',
    element: <ConnectPage/>
  },
  {
    path: '/conversation',
    element: <ConversationsPage/>
  },
  {
    path: '/conversation/:conversationId',
    element: <ConversationPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
