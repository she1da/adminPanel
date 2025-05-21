import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({  allowedRoles }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      console.log('login', user);

      navigate('/login');
    }

    if (!allowedRoles.includes(user?.role)) {
      console.log('role check', user);

      navigate(path);
    }
    console.log(user);
  }, []);

  return element;
};

export default ProtectedRoute;
