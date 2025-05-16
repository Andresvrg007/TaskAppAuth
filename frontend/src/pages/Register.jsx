import {Link,  useNavigate} from "react-router-dom"
import { useState } from "react"
import Swal from 'sweetalert2'
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
import "./Register.css"

export const Register=()=>{
    const [email, setEmail]=useState('');
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const navigate = useNavigate();
   
  
    
    const onSubmit= async (e)=>{
        e.preventDefault();
        try {
            const user={
                email: email.toLowerCase().trim(),
                username: username.toLowerCase().replace(/\s/g, ""),
                password // ← la contraseña no se convierte
            }
            
            let register=await fetch(`${BACKEND_URL}/register`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if(!register.ok){
                const errorData = await register.json(); // extrae el JSON del error
                throw new Error(errorData.message); // lanza error con tu mensaje
            }
            Swal.fire({
                title: `Account has been created USERNAME: ${username.replace(/\s/g, "")}`,
                icon: "success",
                draggable: true
              });

            setEmail('');
            setUsername('');
            setPassword('');  
            navigate('/'); 
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: `${error}`,
                icon: "error",
                draggable: true
              });
        }

      }

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={ onSubmit}>
                <h2>Create Account</h2>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Email" name="email"  required />
                <input onChange={(e)=>setUsername(e.target.value)}  value={username} type="text" placeholder="Username [no spaces]" name="username" required />
                <input onChange={(e)=>setPassword(e.target.value)}   value={password} type="password" placeholder="Password" name="password" required />
                <button type="submit">Register</button>
                <p className="login-link">Already have an account? <Link to="/">Login</Link></p>
            </form>
        </div>
    )
}