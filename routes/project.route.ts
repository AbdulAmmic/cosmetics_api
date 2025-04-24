import express, { Response } from "express";
import { RequestType } from "..";
import { createProject, createTask, createWorker, deleteProject, deleteWorker, getProjectById, getProjects, getTaskbyId, getTasks, getWorkerById, getWorkers, updateProject, updateTask, updateWorker } from "../controllers/project.controller";

export const projectRoute = express.Router();

projectRoute.get("/", (req:RequestType, res:Response)=>{
    getProjects(req, res);
});

projectRoute.get("/:id", (req: RequestType, res: Response)=>{
   getProjectById(req, res); 
});

projectRoute.post("/", (req: RequestType, res: Response)=>{
    createProject(req, res);
});

projectRoute.put("/:id", (req:RequestType, res:Response)=>{
    updateProject(req, res);
});

projectRoute.delete("/:id", (req:RequestType, res:Response)=>{
    deleteProject(req, res);    
});

projectRoute.get("/task", (req:RequestType, res:Response) =>{
    getTasks(req, res);
});

projectRoute.get("/task/:id", (req: RequestType, res: Response)=>{
    getTaskbyId(req, res);
});

projectRoute.put("/task/:id", (req:RequestType, res:Response)=>{
    updateTask(req, res);
});

projectRoute.post("/task", (req:RequestType, res: Response) =>{
    createTask(req, res);
});

projectRoute.post("/worker", (req:RequestType, res:Response)=>{
    createWorker(req, res);
});

projectRoute.get("/worker", (req:RequestType, res:Response)=>{
    getWorkers(req, res);
});

projectRoute.get("/worker/:id", (req:RequestType, res:Response)=>{
    getWorkerById(req, res);
});

projectRoute.put("/worker/:id", (req:RequestType, res:Response)=>{
    updateWorker(req, res);
});

projectRoute.delete("/worker/:id", (req:RequestType, res:Response)=>{
    deleteWorker(req, res);
});