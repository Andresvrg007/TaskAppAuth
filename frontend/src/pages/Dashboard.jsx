import React, { useState, useLayoutEffect,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';
import { jwtDecode } from "jwt-decode";
import {Card} from "./Card"
import { Input } from './Input';


export const Dashboard = ({}) => {
  const [tareas, setTareas]=useState([])
  const navigate = useNavigate();
  const token= localStorage.getItem('token');
  const {username, auth} = jwtDecode(token);

  useLayoutEffect(() => {
    const getTasks= async()=>{
      try {
        let data= await fetch(`http://localhost:3000/dashboard/${username}`);
        let response=await data.json();
        let tasks=await response.tasks;
        setTareas(tasks);
        
        
        if(!data.ok){
          throw new Error("Error getting tasks")
        }
      } catch (error) {
        console.log(error)
      }
    }
    getTasks();
    
  }, [])
  
 
  
  
 

  const goLogin=()=>{
    localStorage.removeItem("token");
    navigate('/')
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome back, <span>{username}</span></h2>
        <button onClick={goLogin}>Logout</button>
      </header>

     <Input username={username} tareas={tareas} setTareas={setTareas}/>

      <main className="dashboard-main">
        <div className="card-container">
          <Card tareas={tareas} username={username} setTareas={setTareas}/>
        </div>
      </main>
    </div>
  );
};
