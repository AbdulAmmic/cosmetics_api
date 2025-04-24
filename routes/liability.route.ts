
import express, { Response } from "express";
import { RequestType } from "..";
import { createLiability, deleteLiability, getLiabilities, updateLiability } from "../controllers/liability.controller";

export const liabilityRoute = express.Router();

liabilityRoute.get("/", (req:RequestType, res:Response)=>{
    getLiabilities(req, res);
});


liabilityRoute.post("/", (req:RequestType, res:Response)=>{
    createLiability(req, res);
});

liabilityRoute.put("/:id", (req:RequestType, res:Response)=>{
    updateLiability(req, res);
});

liabilityRoute.delete("/:id", (req:RequestType, res:Response)=>{
    deleteLiability(req, res);
});