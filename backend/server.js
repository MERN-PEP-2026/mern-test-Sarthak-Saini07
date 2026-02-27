import express from "express";
import cors from "cors";
// import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server running");
})
app.listen(5000,()=>{
    console.log("server is running at port 5000");
})
