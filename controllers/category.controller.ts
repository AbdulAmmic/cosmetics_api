import { prisma } from "../prisma/prismaClient";
import { RequestType } from "..";
import { Response } from "express";

export const createCategory = async (req: RequestType, res: Response) => {
    try{
        const body = req.body;
        const category = await prisma.category.create({data: body});
        return res.status(201).json(category);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
};

export const getCategories = async (req: RequestType, res: Response) => {
    try{
        const categories = await prisma.category.findMany();
        return res.status(200).json(categories);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
}

export const editCategory = async (req: RequestType, res: Response) => {
    try{
        const body = req.body;
        const id = req.params.id;
        const category = await prisma.category.update({where: {id}, data: body});
        return res.status(201).json(category);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
}

export const deleteCategory = async (req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const category = await prisma.category.delete({where: {id}});
        return res.status(201).json(category);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
}