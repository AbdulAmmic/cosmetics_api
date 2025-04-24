import express, { Response } from "express";
import { RequestType } from "..";
import { createMessage, getMessageById, getMessages } from "../controllers/message.controller";

export const messageRoute = express.Router();


messageRoute.get("/", (req:RequestType, res:Response)=>{
    getMessages(req, res);
});

messageRoute.post("/", (req:RequestType, res:Response)=>{
    createMessage(req, res);
});

messageRoute.get("/:id", (req:RequestType, res:Response)=>{
    getMessageById(req, res);
});

