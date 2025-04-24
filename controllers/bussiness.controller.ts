import { prisma } from "../prisma/prismaClient";
import { RequestType } from "..";
import { Response } from "express";

// Create a new Bussiness
export const createBussiness = async (req: RequestType, res: Response) => {
  try {
    const { name, email } = req.body;

    const newBussiness = await prisma.bussiness.create({
      data: { name, email },
    });

    return res.status(201).json(newBussiness);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Get all Bussinesses
export const getAllBussinesses = async (req: RequestType, res: Response) => {
  try {
    const bussinesses = await prisma.bussiness.findMany();
    return res.status(200).json(bussinesses);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Get a single Bussiness by ID
export const getBussinessById = async (req: RequestType, res: Response) => {
  try {
    const { id } = req.params;

    const bussiness = await prisma.bussiness.findUnique({
      where: { id },
      include: { users: true, Shop: true, Items: true, Invoice: true },
    });

    if (!bussiness) {
      return res.status(404).json({ message: "Bussiness not found" });
    }

    return res.status(200).json(bussiness);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete a Bussiness by ID
export const deleteBussiness = async (req: RequestType, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.bussiness.delete({ where: { id } });

    return res.status(200).json({ message: "Bussiness deleted successfully" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
// Update a Bussiness Info

export const updateBussiness = async (req: RequestType, res: Response) =>{
  try{
    const {id} = req.params;
    const bussiness = await prisma.bussiness.update({where: {id}, data: req.body});
    return res.status(201).json(bussiness);
  }catch(err:any){
    return res.status(500).json({error: err.message})
  }
}