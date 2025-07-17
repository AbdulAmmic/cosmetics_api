
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {prisma} from "../prisma/prismaClient";


const JWT_SECRET = "Shhhhhhhhhhhh!";

export const AuthenticateToken:any = async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']; 
    console.log("Header", authHeader);

    
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Login First!" });
    }

    
    jwt.verify(token, JWT_SECRET, async (err: any, decoded:any) => { 
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token", token });
        }
        const decodedPayload = decoded as JwtPayload;
        const user = await prisma.user.findFirst({where: { id: decodedPayload.userID }, include: { bussiness: true, shop: true, recieved: {include: {sender: true}} } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        req.user = user;
        next();
    });
};