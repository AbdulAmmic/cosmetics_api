import { prisma } from "../prisma/prismaClient";
import { Response } from "express";
import { RequestType } from "..";


export const createExpenses = async (req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        body.date = body.date ? new Date(body.date) : new Date();
        const newExpense = await prisma.expenses.create({data: body});
        return res.json(newExpense).status(201);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
}

export const getExpenses = async (req: RequestType, res: Response) =>{
    try{
        const filter = req.query ?? {};
        const expenses = await prisma.expenses.findMany();
        return res.json(expenses).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
}

export const getExpenseById = async (req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const expense = await prisma.expenses.findUnique({where: {id}});
        return res.json(expense).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
}

export const updateExpense = async (req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        const id = req.params.id;
        const expense = await prisma.expenses.update({where: {id}, data: body});
        return res.json(expense).status(201);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
}

export const deleteExpense = async (req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const expense = await prisma.expenses.delete({where: {id}});
        return res.json(expense).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
}