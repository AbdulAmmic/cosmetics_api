import { createResult, createService, deleteService, getResultById, getResults, getServiceById, getServices, updateService } from "../controllers/services.controller";
import { RequestType } from "..";
import express, { Response } from "express";


export const serviceRoute = express.Router();

serviceRoute.get("/", (req:RequestType, res:Response)=>{
    getServices(req, res);
});

serviceRoute.get("/:id", (req:RequestType, res:Response)=>{
    getServiceById(req, res);
});

serviceRoute.post("/", (req:RequestType, res:Response)=>{
    createService(req, res);
});

serviceRoute.put("/:id", (req:RequestType, res:Response)=>{
    updateService(req, res);
});

serviceRoute.delete("/:id", (req:RequestType, res:Response)=>{
    deleteService(req, res);
});

serviceRoute.get("/result", (req:RequestType, res:Response)=>{
    getResults(req, res);
});

serviceRoute.get("/result/:id", (req:RequestType, res:Response)=>{
    getResultById(req, res);
});

serviceRoute.post("/result", (req:RequestType, res:Response)=>{
    createResult(req, res);
});