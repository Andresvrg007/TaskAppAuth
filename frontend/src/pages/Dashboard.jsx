import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';
import { jwtDecode } from "jwt-decode";
import { Card } from "./Card";
import { Input } from './Input';
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const Dashboard = () => {
  const [tareas, setTareas] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Redirige al login si no hay token
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  // Si no hay token, no renderiza nada
  if (!token) {
    return null; // O un loader, o un mensaje de "No autorizado"
  }

  let username, auth;
  try {
    const decoded = jwtDecode(token);
    username = decoded.username;
    auth = decoded.auth;
  } catch (error) {
    // Si el token es inválido, lo eliminamos y redirigimos al login
    localStorage.removeItem('token');
    navigate('/');
    return null;
  }

  useLayoutEffect(() => {
    const getTasks = async () => {
      try {
        let data = await fetch(`${BACKEND_URL}/dashboard/${username}`);
        let response = await data.json();
        let tasks = await response.tasks;
        setTareas(tasks);

        if (!data.ok) {
          throw new Error("Error getting tasks");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, [username]);

  const goLogin = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome back, <span>{username}</span></h2>
        <button onClick={goLogin}>Logout</button>
      </header>

      <Input username={username} tareas={tareas} setTareas={setTareas} />

      <main className="dashboard-main">
        <div className="card-container">
          <Card tareas={tareas} username={username} setTareas={setTareas} />
        </div>
      </main>
    </div>
  );
};
