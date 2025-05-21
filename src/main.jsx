import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from './context/AuthContext';
const portalDiv = document.getElementById("root");
createRoot(portalDiv).render(
  <StrictMode>
      <AuthProvider >
    <App />
  </AuthProvider>
   
  </StrictMode>
);



