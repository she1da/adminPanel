import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/pages/Home';
import About from '../components/pages/About';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import UsersTable from '../components/UsersTable';
import ProtectedRoute from './ProtectedRout';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/users',
    element: <UsersTable />,
  },
]);
export default router;
