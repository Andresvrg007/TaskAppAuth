import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/dashboard';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function App() {
  const token = localStorage.getItem('token');
  let auth = false;

  if (typeof token === 'string' && token.length > 0) {
    try {
      const { auth: authFromToken } = jwtDecode(token);
      auth = Boolean(authFromToken);
    } catch (err) {
      console.error('Token inválido o expirado:', err);
      
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
          path="/dashboard"
          element={
            auth
              ? <Dashboard />
              : <Login />
          }
        />
    </Routes>
  );
}

export default App;
