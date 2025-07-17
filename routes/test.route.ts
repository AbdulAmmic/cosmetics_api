import express, {Response} from "express";
import { RequestType } from "..";
import { createRecord, createTest, deleteRecord, deleteTest, getTestById, getTestRecordById, getTestRecords, getTests, groupTestRecordByTests, updateTest, updateTestRecord } from "../controllers/test.controller";


export const testRouter = express.Router();

testRouter.get("/", async (req: RequestType, res: Response) => {
    getTests(req, res);
});

testRouter.post("/", async (req: RequestType, res: Response)=>{
    createTest(req, res)
});

testRouter.get("/:id", async (req: RequestType, res: Response) => {
    getTestById(req, res)
});

testRouter.delete("/:id", async (req: RequestType, res: Response) => {
    deleteTest(req, res);
});

testRouter.put("/:id", async (req: RequestType, res: Response) => {
    updateTest(req, res);
});
testRouter.post("/test/record", async (req: RequestType, res: Response) => {
    createRecord(req, res);
});

testRouter.get("/test/record", async (req: RequestType, res: Response) => {
    getTestRecords(req, res);  
});

testRouter.get("/test/record/:id", async (req: RequestType, res: Response) => {
    getTestRecordById(req, res);
});

testRouter.delete("/test/record/:id", async (req: RequestType, res: Response) => {
    deleteRecord(req, res);
});

testRouter.put("/test/record/:id", async (req: RequestType, res: Response) => {
    updateTestRecord(req, res);
});
testRouter.get("/test/stats", (req: RequestType, res: Response) => {
    groupTestRecordByTests(req, res);
});

