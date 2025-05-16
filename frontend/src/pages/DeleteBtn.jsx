import './Card.css'
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
export const DeleteBnt=({username, setTareas, tareas})=>{
    const onDelete= async (btn)=>{
        let text=btn.closest("div").querySelector("p").textContent;
         
        try {
            let task=await fetch(`${BACKEND_URL}/`,{
                method:"DELETE",
                headers:{
    
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({task:text, username})
            });
            if(!task.ok){
                throw new Error(`ERROR SENDING TASKS: ${task.statusText}`)
            }
            let response=await task.json();
            let data= await response.tasks
           setTareas([...data]);
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <button className="delete-btn" onClick={e=>{onDelete(e.target)}}>Delete</button>
    )
}