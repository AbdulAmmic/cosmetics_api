import { prisma } from "../prisma/prismaClient";
import { RequestType } from "..";
import { Response } from "express";
import { sendEmail } from "../utils/mail";


export const createCustomer = async (req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        const customer = await prisma.customer.create({data: body});
        return res.status(201).json(customer);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
};

export const getCustomers = async (req: RequestType, res: Response) =>{
    try{
        const filter = req.query ?? {};
        const customers = await prisma.customer.findMany({
            where: filter,
            include: {Invoice:true}
        });
        return res.status(200).json(customers);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
};

export const getCustomerById = async (req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const customer:any = await prisma.customer.findUnique({where: {id}, include: {Invoice: true}});
        delete customer.code;
        customer.totalSpent = customer.Invoice.reduce((acc:any, invoice:any) => acc + invoice.totalCost, 0);
        customer.lastPurchaseDate = customer.Invoice[customer.Invoice.length - 1] ? customer.Invoice[customer.Invoice.length - 1].createdAt: "______";
        return res.status(200).json(customer);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
};

export const updateCustomer = async (req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        const id = req.params.id;
        const customerData = await prisma.customer.findUnique({where: {id}});
        if(body.walletBalance){
            
            const code = customerData.code;
            if(parseFloat(code) !== parseFloat(body.code)){
                return res.status(400).json({error: "Invalid Code"});
            }

        }
        const customer = await prisma.customer.update({where: {id}, data: body});
        return res.status(201).json(customer);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
};

export const verifyWalletUpdate = async (req: RequestType, res: Response) =>{
    try{
        
        const id = req.params.id;
        const customerData = await prisma.customer.findUnique({where: {id}});
        const code = Math.floor(Math.random() * 90000) + 10000;
        await prisma.customer.update({where: {id}, data: {code: String(code)}});
        await sendEmail(customerData.email, "Customer Wallet Verification", `Your Wallet Update Verification Code is ${code}`);
        return res.status(201).json({message: "Verification Code Sent"});
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
}

export const deleteCustomer = async (req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const customer = await prisma.customer.delete({where: {id}});
        return res.status(201).json(customer);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
};