import { prisma } from "../prisma/prismaClient";
import { RequestType } from "..";
import { Response } from "express";


export const createTest = async(req: RequestType, res: Response) =>{
    try{
        const body = req.body;

        const newTest  = await prisma.tests.create({data: body});
        return res.json(newTest).status(201);

    }catch(err:any){
        throw err;
    }
}

export const createRecord = async (req: RequestType, res: Response) =>{
    try{
        const body = req.body;
        const newRecord = await prisma.testRecord.create({data: body});
        return res.json(newRecord).status(201);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
}

export const getTests = async (req: RequestType, res: Response) =>{
    try{
        const filters = req.query ?? {};
        const tests = await prisma.tests.findMany({where: filters});
        return res.json(tests).status(200);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
}

export const getTestById = async (req: RequestType, res: Response) =>{
    try{
        const id = req.params.id;
        const test = await prisma.tests.findUnique({where: {id}});
        return res.json(test).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500)
    }
};

export const updateTest = async (req: RequestType, res: Response) =>{
    try{
        const {id} = req.params;
        const body = req.body;
        const   test = await prisma.tests.update({where: {id}, data: body});
    }catch(err:any){
        return res.json({error:err.message}).status(500);
    }
}

export const deleteTest = async(req: RequestType, res: Response) => {
    try{
        const {id} = req.params;
        const test = await prisma.tests.delete({where: {id}});
        return res.json(test).status(200);

    }catch(err:any){
        return res.json({error:err.message}).status(500);
    }
}


export const getTestRecords = async (req: RequestType, res: Response) =>{
    try{
        const filters = req.query ?? {};
        const records = await prisma.testRecord.findMany({where: filters, include: {customer: true}});
        return res.json(records).status(200);

    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
}

export const getTestRecordById = async (req: RequestType, res: Response) =>{
    try{

        const {id} = req.params;
        const record = await prisma.testRecord.findUnique({where: {id}, include: {customer: true}});
        return res.json(record).status(200);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
}

export const updateTestRecord = async (req: RequestType, res: Response) =>{
    try{
        const {id} = req.params;
        const body = req.body;
        const record = await prisma.testRecord.update({where: {id}, data: body});
        return res.json(record).status(200);
    }catch(err:any){
        return res.status(500).json({error: err.message});
    }
}

export const deleteRecord = async(req:RequestType, res:Response) =>{
    try{
        const {id} = req.params;
        const record = await prisma.testRecord.delete({where: {id}});
        return res.json(record).status(200);
    }catch(err:any){
        return res.json({error: err.message}).status(500);
    }
}


export const groupTestRecordByTests = async (req: RequestType, res: Response) => {
    try {
      // Fetch all TestRecord entries with their `tests` array
      const testRecords = await prisma.testRecord.findMany({
        select: {
          tests: true, // Only fetch the `tests` array
        },
      });
  
      // Flatten the tests array and count occurrences of each test
      const testCounts = testRecords
        .flatMap(record => record.tests) // Flatten all `tests` arrays
        .reduce((acc, test) => {
          acc[test] = (acc[test] || 0) + 1; // Count occurrences
          return acc;
        }, {} as Record<string, number>);
  
      // Convert the counts into an array format
      const result = Object.entries(testCounts).map(([test, count]) => ({
        test,
        count,
      }));
  
      // Respond with the grouped data
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error('Error grouping TestRecords:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };