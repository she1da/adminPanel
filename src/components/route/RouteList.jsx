import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';

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

