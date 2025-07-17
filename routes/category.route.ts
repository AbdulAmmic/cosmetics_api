import express, {Response} from "express";
import { RequestType } from "..";
import { createCategory, deleteCategory, editCategory, getCategories } from "../controllers/category.controller";


export const categoryRoute = express.Router();


categoryRoute.get("/", async (req: RequestType, res: Response) => {
    getCategories(req, res);
});

categoryRoute.post("/", async (req: RequestType, res: Response)=>{
    createCategory(req, res);
});

categoryRoute.put("/:id", async (req: RequestType, res: Response)=>{
    editCategory(req, res);
});

categoryRoute.delete("/:id", async (req: RequestType, res: Response)=>{
    deleteCategory(req, res);
});
