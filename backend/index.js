import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import User from "./models/users.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PORT } from "./config.js"



const app = express();

app.use(cors());
app.use(express.json());


const JWT_SECRET = "mi_clave_secreta_super_segura"; // En producción must change


app.get('/user', async(req,res)=>{
    try {
        const users= await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({'error getting users': error});
    }
  
});

app.get('/dashboard/:username', async(req,res)=>{
    try {
        const user = await User.findOne({ username: req.params.username });
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({'error getting user': error});
    }
  
});


app.post('/register',async(req,res)=>{
  const {email, username , password} = req.body;
  const user = await User.findOne({ username: username });
  const emailDB = await User.findOne({ correo: email});

  if(user===null && emailDB===null){
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await User.create({
        name: username,
        username,
        correo:email,
        password: hashedPassword,
        tasks: []
      });
    } catch (error) {
      console.log(error)
    }
    res.status(200).json({message:"Added to the DB"})
    
  }else{
    if (user && emailDB !== null) {
      return res.status(409).json({ message: "Username and email are already taken" });
    } else if (user !== null) {
      return res.status(409).json({ message: "Username is already taken" });
    } else if (emailDB !== null) {
      return res.status(409).json({ message: "Email is already registered" });
    }
  }
  
  
  
});

app.post('/', async(req,res)=>{
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      // Crear token JWT
      const token = jwt.sign(
        { id: user._id, username: user.username, auth:true },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        message: "Login successful",
        token
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  
});

app.post('/dashboard', async(req,res)=>{
  
  const {task,username}=req.body;
  
    try {
      const updated = await User.findOneAndUpdate(
        { username },
        { $push: { tasks: task} },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.status(200).json({message:'Got it', newTask: task})
    } catch (err) {
      console.error('Error al añadir task:', err);
    }
  
  

})

app.delete("/", async (req, res) => {
  const { task, username } = req.body;

  try {
    // 1) Intenta quitar la task del array
    const updated = await User.findOneAndUpdate(
      { username },
      { $pull: { tasks: task } },
      { new: true }
    );

    // 2) Si no existe ese usuario, devolvemos 404
    if (!updated) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // 3) Éxito: devolvemos el array actualizado
    return res.status(200).json({
      message: "Tarea eliminada",
      tasks: updated.tasks
    });

  } catch (error) {
    console.error(error);
    // 4) En caso de excepción, enviamos un 500 con el mensaje real
    return res.status(500).json({ error: error.message });
  }
});
// 👇 Envolver todo en una función async
const startServer = async () => {
  try {
    await connectDB(); // Espera conexión a MongoDB
    
    

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
    
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};
startServer(); // Llama a la función





