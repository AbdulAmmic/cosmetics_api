import express, {Response} from "express";
import { RequestType } from "..";
import { deleteUser, getUsers, login, register, updateUser } from "../controllers/auth.controller";
export const authRoute = express.Router();


authRoute.post("/register", async (req: RequestType, res: Response) => {
    register(req, res);
});

authRoute.post("/login", async (req: RequestType, res: Response) => {
    login(req, res);
});

authRoute.get("/users", async (req: RequestType, res: Response) => {
    getUsers(req, res);
});

authRoute.delete("/users/:id", async (req: RequestType, res: Response) => {
    deleteUser(req, res);
});

authRoute.put("/users/:id", async (req: RequestType, res: Response) => {
    updateUser(req, res);
});