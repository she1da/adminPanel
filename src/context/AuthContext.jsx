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
  // const [state, dispatch] = useReducer(authReducer, initialState);
  const [currentUser, setCurrentUser] = useState(null);
  // const navigate = useNavigate();

  const login = (response) => {
    // storeCredentials(response.credentials);
    console.log({ response });
    setCurrentUser(response.user);
  };

  const contextValue = useMemo(
    () => ({
      currentUser,
      login,
      authorizationCheck,
      authenticationCheck,
    }),
    [currentUser, login]
  );
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
