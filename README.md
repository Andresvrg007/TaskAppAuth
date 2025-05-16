# 🚀 SecureTasker

A modern, full-stack task management app built with the MERN stack (MongoDB, Express, React, Node.js). SecureTasker features JWT authentication, protected routes, and a seamless SPA experience. Perfect for learning, portfolio, or as a base for your own productivity tools!

---

## ✨ Features
- **User Authentication:** Secure registration and login with JWT tokens
- **Protected Routes:** Only authenticated users can access the dashboard
- **Task Management:** Add, view, and delete your personal tasks
- **Modern SPA:** Built with React, React Router, and Vite for fast navigation
- **RESTful API:** Express backend with MongoDB/Mongoose
- **Environment Variables:** Easy configuration for local and cloud deployment

---

## 🛠️ Tech Stack
- **Frontend:** React, React Router, Vite, SweetAlert2
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Deployment:** Railway, MongoDB Atlas, Vercel (or any cloud provider)

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Andresvrg007/TaskAppAuth
cd tasksapp
```

### 2. Setup the backend
```bash
cd backend
npm install
```
- Create a `.env` file in `/backend` with:
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_super_secret_key
  PORT=3000
  ```
- Start the backend:
  ```bash
  npm run dev
  # or
  npm start
  ```

### 3. Setup the frontend
```bash
cd ../frontend
npm install
```
- Create a `.env` file in `/frontend` with:
  ```
  VITE_BACKEND_URL=http://localhost:3000
  ```
- Start the frontend:
  ```bash
  npm run dev
  ```

### 4. Open the app
- Visit [http://localhost:5173](http://localhost:5173) in your browser.
- Register a new user, log in, and start managing your tasks!

---

## 🌐 Deployment

- Update your environment variables accordingly for production URLs.

---

## 📸 Screenshots
> _Add your own screenshots here to show off the app!_

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
[MIT](LICENSE)
