import express, {Response} from "express";
import { RequestType } from "..";
import { createShop, deleteShop, getAllShops, getShopById } from "../controllers/shop.controller";
// import { getShopById } from "controllers/shop.controller";
export const shopRoute = express.Router();



shopRoute.get("/", (req: RequestType, res: Response)=>{
    getAllShops(req, res);
});

shopRoute.get("/:id", (req: RequestType, res: Response)=>{
    getShopById(req, res);
});

shopRoute.post("/", (req:RequestType, res: Response)=>{
    createShop(req, res);
});

shopRoute.delete("/:id", (req:RequestType, res:Response)=>{
    deleteShop(req, res);
});

// shopRoute.put("/:id", (req:RequestType, res:Response)=>{
//     // updateShop(req, res);
// });

