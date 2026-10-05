/** 
 * Holds APIs using express??
 */

import express from "express";
import { connectMongo } from "./database.js";
import dotenv from "dotenv";
import Task from "./Task.js";
import cors from "cors";

dotenv.config()

const app = express();

connectMongo();

app.use(express.json());
app.use(cors()); 

app.listen(5002, () => {
    console.log("Server started on PORT: 5002")
})

// Handle get routes
app.get("/api/taskflow",  async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: 1});
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error getting tasks", error);
        res.status(500).json({ message: "Internal server error"})
    }
    
})

// Handles get route for a spesific task
app.get("/api/taskflow/:id",  async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message: "Task not found"});
        res.status(200).json(task);
    } catch (error) {
        console.error("Error getting task by id", error);
        res.status(500).json({ message: "Internal server error"})
    }
    
})

// Handle post routes
app.post("/api/taskflow", async (req, res) => {
    try{
        const {title, content} = req.body;
        const newTask = new Task({title, content});
        await newTask.save();
        res.status(201).json({message: "You have created your task successfully!"});
    } catch (error) {
        console.error("Error in creating tasks", error);
        res.status(500).json({message: "Internal server error"});
    }
    
})

app.put("/api/taskflow/:id", async (req, res) => {
    try {
        const {title, content} = req.body
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            {title, content})
        
        if(!updatedTask) return res.status(404).json({message: "Task not found"});
        
        res.status(200).json({message: "You have updated your task successfully!"})
        
    } catch (error) {
        console.error("Error in updating tasks", error);
        res.status(500).json({ message: "Internal server error"});
    }
    
})

app.delete("/api/taskflow/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        if(!deletedTask) return res.status(404).json({message: "Task not found"});
        res.status(200).json({message: "You have deleted your task successfully!"});
        
    } catch (error) {
        console.error("Error in deleting tasks", error);
        res.status(500).json({message: "Internal server error"});
    }
    
})




//mongodb+srv://jeevs2406:L52dSqu0G8t4SDG2@cluster0.hnzmaab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0