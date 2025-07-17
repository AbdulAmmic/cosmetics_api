import { prisma } from "../prisma/prismaClient";
import { Response } from "express";
import { RequestType } from "..";


export const createProject = async(req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        body.currentBalance = body.originalBudget;
        const newProject = await prisma.project.create({
            data: body
        });
        return res.json(newProject).status(201);
    }catch(err:any){
        return res.json({error: err.message}).status(500)
    }
};

export const getProjects = async(req: RequestType, res: Response) =>{
    try{
        const filter = req.query ?? {};
        const projects = await prisma.project.findMany({
            where: filter,
            include: {Task: true, Worker: true}
        });
        return res.json(projects).status(200);
    }catch(err:any){
        return res.json({err:err.message}).status(500);
    }
};

export const getProjectById = async(req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const project = await prisma.project.findUnique({where: {id}, include: {Task: true, Worker:true}});
        return res.json(project).status(200);
    }catch(err:any){
        return res.json({err:err.message}).status(500);
    }
}

export const deleteProject = async(req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const project = await prisma.project.delete({where: {id}});
        return res.json(project).status(201);    
    }catch(err:any){
        return res.json({err:err.message}).status(500);
    }
};

export const updateProject = async(req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        const id = req.params.id;
        const project = await prisma.project.update({where: {id}, data: body});
        return res.json(project).status(201);
    }catch(err:any){
        return res.json({err:err.message}).status(500);
    }
}

export const createTask = async(req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        const task = await prisma.task.create({data: body});
        
        await prisma.project.update({
            where: { id: task.projectID },
            data: {
                currentBalance: { increment: task.price },
            }
        })
        return res.json(task).status(201);
    }catch(err:any){
        return res.json({err:err.message}).status(500);
    }
}

export const getTasks = async (req:RequestType, res: Response) =>{
    try{
        const filter = req.query ?? {};
        const tasks = await prisma.task.findMany({
            where: filter,
            include: {project: true, worker: true}
        });
        return res.json(tasks).status(200);

    }catch(err:any){
        return res.json({err:err.message}).status(500);
    }
}

export const getTaskbyId = async (req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const task = await prisma.task.findUnique({where: {id}, include: {project: true, worker: true}});
        return res.json(task).status(200);
    }catch(err:any){
        return res.json({err:err.message}).status(500);
    }
}

export const updateTask = async (req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        const id = req.params.id;
        const task = await prisma.task.update({where: {id}, data: body});
        return res.json(task).status(200);
    }catch(err:any){
        return res.json({err:err.message}).status(500);
    }
}

export const deleteTask = async (req: RequestType, res: Response) =>{
    try{
        const {id} = req.params;
        const task = await prisma.task.delete({where: {id}});
        return res.json(task).status(200);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
}

//create Worker
export const createWorker = async (req: RequestType, res: Response) => {
    try{
        const body = req.body;
        const worker = await prisma.worker.create({data: body});
        return res.json(worker).status(201);
    }catch(err:any){
        return res.json({err:err.message}).status(500);
    }
}
//getWorkers
export const getWorkers = async (req: RequestType, res: Response) =>{
    try{
        const filter = req.query ?? {};
        const workers = await prisma.worker.findMany({where: filter});
        return res.json(workers).status(200);
    }catch(err:any){
        return res.json({err:err.message}).status(500);
    }
}
//updateWorker
export const updateWorker = async (req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        const id = req.params.id;
        const worker = await prisma.worker.update({where: {id}, data: body});
        return res.json(worker).status(200);
    }catch(err:any){
        return res.json({err:err.message}).status(500);
    }
}
//deleteWorker
export const deleteWorker = async (req: RequestType, res: Response) =>{
    try{
        const {id} = req.params;
        const worker = await prisma.worker.delete({where: {id}});
        return res.json(worker).status(200);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
}


export const getWorkerById = async (req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const worker = await prisma.worker.findUnique({where: {id}});
        return res.json(worker).status(200);
    }catch(err:any){
        return res.json({err:err.message}).status(500);
    }
}