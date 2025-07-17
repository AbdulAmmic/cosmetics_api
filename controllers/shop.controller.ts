import { prisma } from "../prisma/prismaClient";
import { RequestType } from "..";
import { Response } from "express";

// Create a new Shop
export const createShop = async (req: RequestType, res: Response) => {
  try {
    const { name, bussinessId } = req.body;

    const newShop = await prisma.shop.create({
      data: { name, bussinessId },
    });

    return res.status(201).json(newShop);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Get all Shops
export const getAllShops = async (req: RequestType, res: Response) => {
  try {
    const shops = await prisma.shop.findMany({include: {bussiness: true}});
    return res.status(200).json(shops);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
// export const getAllShops = async (req: RequestType, res: Response) => {};

// Get a single Shop by ID
export const getShopById = async (req: RequestType, res: Response) => {
  try {
    const { id } = req.params;

    const shop = await prisma.shop.findUnique({
      where: { id },
      include: { User: true, Items: true, Invoice: true },
    });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.status(200).json(shop);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete a Shop by ID
export const deleteShop = async (req: RequestType, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.shop.delete({ where: { id } });

    return res.status(200).json({ message: "Shop deleted successfully" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
