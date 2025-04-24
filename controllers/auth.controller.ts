import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/prismaClient";
import { Response } from "express";
import { RequestType } from "..";
import { sendEmail } from "../utils/mail";
// import { connect } from "http2";

const JWT_SECRET = "Shhhhhhhhhhhh!";
export const login = async (req: RequestType, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await prisma.user.findFirst({ where: { email }, include: { recieved: {include: {sender: true}} }});
        if (!user) return res.status(401).json({ err: "Invalid Credentials" });

        // Compare plain password with hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ err: "Invalid Credentials" });
        }

        // Sign the JWT token
        const token = jwt.sign({ email: user.email }, JWT_SECRET!); // Ensure JWT_SECRET is defined

        // Modify user object before sending it
        const userResponse = { ...user, password: 'private' };

        return res.status(202).json({ data: userResponse, token });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

export const register = async (req: RequestType, res: Response) => {
    try {
        const body = req.body;
        body.password =( Math.floor(Math.random() * 90000000) + 10000000).toString(); //Random 8 digits
        // Hash the password
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.shop = {connect: {id: body.shopId}}
        body.bussiness = {connect: {id: body.bussinessId}};

        delete body.shopId;
        delete body.bussinessId;

        // Check if email already exists
        const sameemail = await prisma.user.findFirst({ where: { email: body.email } });
        if (sameemail) {
            return res.status(403).json({ err: "User already Exists" });
        }
        await sendEmail(body.email, "Account Password", `Your account password is ${body.password}`);
        //
        body.password = hashedPassword;
        const newUser = await prisma.user.create({ data: body });

        return res.status(201).json(newUser);
    } catch (err: any) {
        return res.status(500).json({ err: err.message });
    }
};

/**
 * Retrieves all users from the database.
 * 
 * @param req - The request object containing request details.
 * @param res - The response object used to send back the desired HTTP response.
 * 
 * @returns A JSON response with the list of users or an error message.
 */

export const getUsers = async (req: RequestType, res: Response) => {
    try {
        const users = await prisma.user.findMany({include: {shop: true, bussiness: true}});
        return res.status(200).json(users);
    } catch (err: any) {
        return res.status(500).json({ err: err.message });
    }
}


export const updateUser = async (req: RequestType, res: Response) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const user = await prisma.user.update({where: {id}, data: body});
        return res.status(200).json(user);
    }catch(err:any){
        return res.status(500).json({err: err.message});
    }
}

export const deleteUser = async (req: RequestType, res: Response) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.delete({where: {id}});
        return res.status(200).json(user);
    }catch(err:any){

    }
}