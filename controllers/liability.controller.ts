import { prisma } from "../prisma/prismaClient";
import { Response } from "express";
import { RequestType } from "..";


export const createLiability = async (req: RequestType, res: Response) => {
    try{
        const data = req.body;
        const liability = await prisma.liability.create({data});
        return res.json(liability).status(201);
    }catch(err:any){
        return res.json({error: err.message}).status(500)
    }
}

export const getLiabilities = async (req: RequestType, res: Response) => {
    try{
        const liabilities = await prisma.liability.findMany();
        return res.json(liabilities).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500)
    }
}

export const updateLiability = async (req: RequestType, res: Response) => {
    try{
        const body = req.body;
        const id = req.params.id;
        const liability = await prisma.liability.update({where: {id}, data: body});
        return res.json(liability).status(201);
    }catch(err:any){
        return res.json({error: err.message}).status(500)
    }
}

export const deleteLiability = async (req: RequestType, res: Response) => {
    try{
        const id = req.params.id;
        const liability = await prisma.liability.delete({where: {id}});
        return res.json(liability).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500)
    }
}