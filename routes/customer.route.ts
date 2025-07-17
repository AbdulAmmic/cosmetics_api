// import { prisma } from "../prisma/prismaClient";
import { createCustomer, deleteCustomer, getCustomerById, getCustomers, updateCustomer, verifyWalletUpdate } from "../controllers/customer.controller";
import { RequestType } from "..";
import express, { Response } from "express";

export const customerRoute = express.Router();

customerRoute.get("/", async (req: RequestType, res: Response) => {
    getCustomers(req, res);
});

customerRoute.get("/:id", async (req: RequestType, res: Response) => {
    getCustomerById(req, res)
});

customerRoute.post("/", async (req: RequestType, res: Response)=>{
    createCustomer(req, res);
});

customerRoute.put("/:id", async (req:RequestType, res:Response)=>{
    updateCustomer(req, res);
});
customerRoute.delete("/:id", async (req:RequestType, res:Response)=>{
    deleteCustomer(req, res);
});

customerRoute.get("/verify/:id", async (req:RequestType, res:Response)=>{
    verifyWalletUpdate(req, res);
});
