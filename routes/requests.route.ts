import express, {Response} from "express";
import { RequestType } from "..";
import { createRequest, editRequest, getOneRequest, getRequests } from "../controllers/requests.controller";


export const requestsRoute = express.Router();

requestsRoute.get("/", (req:RequestType, res:Response)=>{
    getRequests(req, res);
});

requestsRoute.post("/", (req:RequestType, res:Response)=>{
    createRequest(req, res);
});

requestsRoute.get("/:id", (req:RequestType, res:Response) => {
    getOneRequest(req, res);
});  

requestsRoute.put("/:id", (req:RequestType, res:Response)=>{
    editRequest(req, res);
});