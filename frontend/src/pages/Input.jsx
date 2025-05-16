import { useState } from 'react';
import './Dashboard.css';
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const Input=({username,tareas, setTareas})=>{
   const [inputValue, setInputValue] = useState('');


    
    const sendTask= async(e)=>{
        e.preventDefault()
        
        
        try {
            let task=await fetch(`${BACKEND_URL}/dashboard`,{
                method:"POST",
                headers:{
    
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({task:inputValue, username})
            });
            if(!task.ok){
                throw new Error(`ERROR SENDING TASKS: ${task.statusText}`)
            }
            let response=await task.json();
            setTareas([...tareas, response.newTask]);
            setInputValue('');
        } catch (error) {
            console.log(error)
        }
    }

    return (
         <form className="task-form" onSubmit={sendTask}>
                <input
                  type="text"
                  placeholder="Enter a task..."
                  onChange={e=> setInputValue(e.target.value)}
                  value={inputValue}
                />
                <button type="submit">Add</button>
          </form>
    )
}