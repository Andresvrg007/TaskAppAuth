import React, { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";
import "./Login.css";
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const Login = ({setAuth}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token= localStorage.getItem('token');
    
    if (token) {
        const { exp,username } = jwtDecode(token);
        const now = Date.now() / 1000;
      
        if (exp < now) {
          // Token expirado → eliminar y redirigir al login
          setAuth(true)
          navigate('/')
        } else {
          // Token válido → mantener sesión
          
          navigate('/dashboard')
        }
      }
  }, [])
  

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BACKEND_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      setAuth(true);
      navigate("/dashboard");
      Swal.fire({
        title: "Login Successful",
        icon: "success"
      });

      

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.message
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};
