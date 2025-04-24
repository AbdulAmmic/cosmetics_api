import express, {Response} from "express";
import { RequestType } from "..";
import { createSupplier, deleteSupplier, getAllSuppliers, getSupplierById, updateSupplier } from "../controllers/supplier.controller";

export const supplierRoute = express.Router();


supplierRoute.get("/", (req: RequestType, res: Response) =>{
    getAllSuppliers(req, res);
});

supplierRoute.post("/", (req:RequestType, res: Response)=>{
    createSupplier(req, res);
});

supplierRoute.get("/:id", (req: RequestType, res: Response)=>{
    getSupplierById(req, res);
});

supplierRoute.put("/:id", (req:RequestType, res: Response)=>{
    updateSupplier(req, res);
});

supplierRoute.delete("/:id", (req: RequestType, res: Response)=>{
    deleteSupplier(req, res);
});

