import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/pages/Home';
import About from '../components/pages/About';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/about",
     element: <About />,        
  },
  {
    path: "/login",
     element: <Login />,        
  },
  {
    path: "/register",
     element: <Register />,        
  },
]);
export default router

