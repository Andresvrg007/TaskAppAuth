import './Card.css'

export const DeleteBnt=({username, setTareas, tareas})=>{
    const onDelete= async (btn)=>{
        let text=btn.closest("div").querySelector("p").textContent;
         
        try {
            let task=await fetch('http://localhost:3000/',{
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