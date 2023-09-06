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
import Login from './components/Account/Login.jsx'
import Signup from './components/Account/Signup.jsx'
import AuthProvider from './components/AuthProvider/AuthProvider.jsx'
import MyContact from './components/MyContact/MyContact.jsx'
import PerMission from './components/PerMission/PerMission.jsx'
import Details from './components/Details/Details.jsx'

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
        path: '/my-contact',
        element: <MyContact></MyContact>
      },
      {
        path: '/permission-request',
        element: <PerMission></PerMission>
      },
      {
        path: '/update/:id',
        element: <Update></Update>
      },
      {
        path: '/details/:id',
        element: <Details></Details>,
        loader: ({ params }) => fetch(`http://localhost:5000/contact-details/${params.id}`)
      },
    ]
  }
  ,
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/signup',
    element: <Signup></Signup>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />

    </AuthProvider>
  </React.StrictMode>,
)
