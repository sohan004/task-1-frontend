import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage.jsx'
import Add from './components/Add/Add.jsx'
import AllContact from './components/AllContact/AllContact.jsx'
import Update from './components/Update/Update.jsx'
import Group from './components/Group/Group.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage></HomePage>
      },
      {
        path: '/add',
        element: <Add></Add>
      },
      {
        path: '/all',
        element: <AllContact></AllContact>
      },
      {
        path: '/group',
        element: <Group></Group>
      },
      {
        path: '/update/:id',
        element: <Update></Update>,
        loader: ({params}) => fetch(`http://localhost:5000/contacts/${params.id}`)
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
