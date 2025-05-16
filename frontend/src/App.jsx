import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/dashboard';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

function App() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (typeof token === 'string' && token.length > 0) {
      try {
        const { auth: authFromToken } = jwtDecode(token);
        setAuth(Boolean(authFromToken));
      } catch (err) {
        setAuth(false);
      }
    } else {
      setAuth(false);
    }
  }, []); 

  return (
    <Routes>
      <Route path="/" element={<Login setAuth={setAuth}/>} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          auth
            ? <Dashboard />
            : <Login setAuth={setAuth}/>
        }
      />
    </Routes>
  );
}

export default App;
