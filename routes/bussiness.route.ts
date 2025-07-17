import express, {Response} from "express";
import { RequestType } from "..";
import { createBussiness, deleteBussiness, getAllBussinesses, getBussinessById, updateBussiness } from "../controllers/bussiness.controller";
export const bussinessRoute = express.Router();


bussinessRoute.get("/", (req:RequestType, res: Response)=>{
    getAllBussinesses(req, res);
});

bussinessRoute.get("/:id", (req: RequestType, res: Response)=>{
    getBussinessById(req, res);
});

bussinessRoute.put("/:id", (req:RequestType, res:Response)=>{
    updateBussiness(req, res);
});

bussinessRoute.delete("/:id", (req:RequestType, res:Response)=>{
    deleteBussiness(req, res);
});

bussinessRoute.post("/", (req:RequestType, res: Response)=>{
    createBussiness(req, res);
})