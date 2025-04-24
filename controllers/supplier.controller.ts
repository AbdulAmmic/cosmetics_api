import { prisma } from "../prisma/prismaClient";
import { RequestType } from "..";
import { Response } from "express";


export const createSupplier = async(req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        body.accountNumber = [];
        body.bank = [];
        body.accountName = [];
        body.balance = "0";
        body.status = "active";
        const supplier = await prisma.supplier.create({
            data: body
        });
        return res.json(supplier).status(200);
    }catch(err:any){
        return res.json({message: err.message}).status(500);
    }
};

export const getAllSuppliers = async (req: RequestType, res: Response) => {
    try{
        const filters = req.query ?? {};
        const suppliers = await prisma.supplier.findMany({});
        return res.status(200).json(suppliers);

    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
}

export const getSupplierById = async (req: RequestType, res: Response) => {
    try{
        const {id} = req.params;
        const supplier = await prisma.supplier.findFirst({
            where: {id}
        });
        return res.json(supplier).status(200);
    }catch(err:any){
        return res.status(500).json({message: err.message})
    }
}

export const updateSupplier = async (req: RequestType, res: Response) => {
    try{
        const {id} = req.params;
        const supplier = await prisma.supplier.update({
            where: {id},
            data: req.body
        });
        return res.json(supplier).status(201);
    }catch(err:any){
        return res.json({message: err.message}).status(500);
    }
};

export const deleteSupplier = async (req: RequestType, res: Response) =>{
    try{
        const {id} = req.params;
        const supplier = await prisma.supplier.delete({
            where: {id},
        });
        return res.status(500).json(supplier);
    }catch(err:any){
        return res.json({message: err.message}).status(500);
    }
}