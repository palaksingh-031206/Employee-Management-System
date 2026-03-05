import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import dns from "node:dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);
import cors from "cors";

dotenv.config();
const app=express();
const port=process.env.port || 3001;

app.use (cors({
        origin:'http://localhost:5173'
    }
))

app.use(express.json());
app.use("/employees",employeeRoutes)
connectDB().then(()=>{
    app.listen (port,() =>{
    console.log(`http://localhost:${port}/employees`);
})
})