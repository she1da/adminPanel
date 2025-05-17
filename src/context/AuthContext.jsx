import React,{useState, createContext, useContext,  useReducer,useMemo,useCallback } from 'react';
import {httpRequest} from '../services/httpRequests'
const initialState = {
  user: null,
  isAuthenticated: false,
};




function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // const [state, dispatch] = useReducer(authReducer, initialState);

  const [currentUser, setCurrentUser] = useState(null);

  const login = useCallback((response) => {

    // storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }, []);


  const contextValue = useMemo(() => ({
    currentUser,
    login
  }), [currentUser, login]);
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
