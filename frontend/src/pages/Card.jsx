import './Card.css'
import { DeleteBnt } from './DeleteBtn'

export const Card=({tareas,username, setTareas})=>{
    const onDelete=()=>{
        console.log('deleting')
    }
   
    return(
        <>
            {
                tareas.length=== 0 ? (
                    <p className="card-text">There are no tasks yet</p>
                ) : (
                    tareas.map((task, i) => 
                    <div className="card" key={i}>
                        <p className="card-text">{task}</p>
                        <DeleteBnt username={username} setTareas={setTareas} tareas={tareas}/>
                    </div>)
                )
            }
        </>
        
      
    )
}



   