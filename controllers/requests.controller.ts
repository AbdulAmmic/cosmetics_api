import { prisma } from "../prisma/prismaClient";
import { Response } from "express";
import { RequestType } from "..";

export const createRequest = async (req: RequestType, res: Response) => {
    try{
        const body = req.body;
        const newRequest = await prisma.requests.create({data: body});
        return res.json(newRequest).status(201);

    }catch(err:any){
        return res.json({error: err.message}).status(500)
    }
};
export const getRequests = async (req: RequestType, res: Response) => {
    try{
        const filters = req.query ?? {};
        const requests = await prisma.requests.findMany({where: filters});
        return res.json(requests).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500)
    }
};
export const getOneRequest = async (req: RequestType, res: Response) => {
    try{
        const id = req.params.id;
        const request = await prisma.requests.findUnique({where: {id}});
        return res.json(request).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500)
    }
};
export const editRequest = async (req: RequestType, res: Response) => {
    try{
        const body = req.body;
        const id = req.params.id;
        const request = await prisma.requests.update({where: {id}, data: body});
        return res.json(request).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500)
    }
};
export const deleteRequest = async (req: RequestType, res: Response) => {
    try{
        const id = req.params.id;
        const request = await prisma.requests.delete({where: {id}});
        return res.json(request).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500)
    }
};