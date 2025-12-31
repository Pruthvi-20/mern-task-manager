// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js'; // path to your file
// import userRoutes from './routes/userRoutes.js';
// import cors from 'cors';
// import taskRoutes from "./routes/taskRoutes.js";

// // Load .env config
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api', userRoutes);
// app.use("/api/tasks", taskRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api", userRoutes);

app.listen(2500, () => console.log("Server running on 2500"));




// npm init -y