import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {  RouterProvider } from 'react-router-dom';
import router from './components/route/RouteList'

function App() {

    return <RouterProvider router={router} />
}

export default App
// import { useAuth } from '../context/AuthContext';

// function Profile() {
//   const { state } = useAuth();

//   return (
//     <div>
//       {state.isAuthenticated ? (
//         <p>Welcome, {state.user.name}!</p>
//       ) : (
//         <p>Please log in.</p>
//       )}
//     </div>
//   );
// }