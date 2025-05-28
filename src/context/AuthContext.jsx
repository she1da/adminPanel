import React, { useState, createContext, useContext, useMemo, useCallback, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const authenticationCheck = (currentUser) => {
  console.log(currentUser);

  if (!currentUser) {
    return false;
  }
  return true;
};

export const authorizationCheck = (currentUser) => {
  console.log(currentUser);

  if ('admin' !== currentUser?.role) {
    return false;
  }
  return true;
};
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    console.log({ storedUser });
    // return null;
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const login = (response) => {
    console.log({ response });
    setCurrentUser(response.currentUser);
    localStorage.setItem('currentUser', JSON.stringify(response.currentUser));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };
  const contextValue = useMemo(
    () => ({
      currentUser,
      login,
      logout,
      authorizationCheck,
      authenticationCheck,
    }),
    [currentUser]
  );
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
