import { prisma } from "../prisma/prismaClient";
import { RequestType } from "..";
import { Response } from "express";
import { error } from "console";

export const createService = async(req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        const newService = await prisma.services.create({
            data: body,
        });
        return res.json(newService).status(201);

    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
};

export const getServices = async (req: RequestType, res: Response) =>{
    try{
        const filter = req.query ?? {};
        const services = await prisma.services.findMany();
        return res.json(services).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
};

export const getServiceById = async (req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const service = await prisma.services.findUnique({where: {id}});
        return res.json(service).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
}

export const updateService = async (req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        const id = req.params.id;
        const service = await prisma.services.update({where: {id}, data: body});
        return res.json(service).status(201);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
};

export const deleteService = async (req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const service = await prisma.services.delete({where: {id}});
        return res.json(service).status(201);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
};

export const getResults = async (req: RequestType, res: Response) =>{
    try{
        const filter = req.query ?? {};
        const results = await prisma.result.findMany();
        return res.json(results).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
};

export const createResult = async (req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        const result = await prisma.result.create({
            data: body
        });
        return res.json(result).status(201);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
};

export const getResultById = async (req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const result = await prisma.result.findUnique({where: {id}});
        return res.json(result).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
};

export const updateResult = async (req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        const id = req.params.id;
        const result = await prisma.result.update({where: {id}, data: body});
        return res.json(result).status(201);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
};

export const deleteResult = async (req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const result = await prisma.result.delete({where: {id}});
        return res.json(result).status(201);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
};

