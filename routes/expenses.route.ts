import { createExpenses, deleteExpense, getExpenseById, getExpenses, updateExpense } from "../controllers/expenses.controller";
import { RequestType } from "..";
import express, { Response } from "express";

export const expenseRouter = express.Router();

expenseRouter.post("/", async (req: RequestType, res: Response) => {
    createExpenses(req, res);
});

expenseRouter.get("/", async (req: RequestType, res: Response) => {
    getExpenses(req, res);
});

expenseRouter.get("/:id", (req: RequestType, res: Response) =>{
    getExpenseById(req, res);
});

expenseRouter.put("/:id", (req: RequestType, res: Response) =>{
    updateExpense(req, res);
});

expenseRouter.delete("/:id", (req: RequestType, res: Response) =>{
    deleteExpense(req, res);
})