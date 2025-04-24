import { Response } from 'express';
import {prisma} from '../prisma/prismaClient';
import multer from 'multer';
import XLSX from 'xlsx';
import { RequestType } from '..';
import { parse } from 'path';

// Configure multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

function excelDateToJSDate(serial:number) {
  
  const excelBaseDate = new Date(1899, 11, 30); 
  const daysToMilliseconds = serial * 24 * 60 * 60 * 1000; 
  return new Date(excelBaseDate.getTime() + daysToMilliseconds);
}


export const bulkUploadProducts = async (req: RequestType, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an Excel file' });
    }
    const {shop_id} = req.body;

    // Read the uploaded Excel file from the buffer
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: any[] = XLSX.utils.sheet_to_json(worksheet);

    // Map the data to the required format
    const products = data.map((item) => {
      let expiryDate:any = null;

      if (item['Expiry Date']) {
        const parsedDate = new Date(`01/${item['Expiry Date']}`);
        if (!isNaN(parsedDate.getTime())) {
          expiryDate = parsedDate;
        }
      }

      if (!expiryDate || isNaN(expiryDate.getTime())) {
        const futureDate = new Date();
        futureDate.setFullYear(new Date().getFullYear() + 1);
        expiryDate = futureDate; // Keep it as a Date object
      }

      return {
        name: item['Item Name'],
        categoryID: item.CategoryID,
        quantity: item.Quantity ? parseInt(item.Quantity) : 0,
        cost: item['Cost Price'] ? parseFloat(item['Cost Price']) : 0,
        price: item['Sale Price'] ? parseFloat(item['Sale Price']) : 0,
        barCode: String(data.indexOf(item) + 1),
        sku: item.SKU?.toString() ? item.SKU.toString() : String(data.indexOf(item) + 1),
        description: item.Description ? item.Description : "",
        reorderQuantity: item['Reorder Quantity'] ? item['Reorder Quantity'] : 0,
        brand: item.Brand ? item.Brand : item['Item Name'],
        unit: item.Unit ? item.unit : "null",
        discountPercentage: item.Discount,
        expiryDate: null as any,
        shopId: shop_id
         // Convert to ISO string for Prisma
      };
    });

    const filteredProducts = products.filter((product) => product.name !== null);

    // Insert the products into the database
    const createdProducts = await prisma.items.createMany({
      data: filteredProducts,
    });

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(201).json({ message: 'Products uploaded successfully', createdProducts });
  } catch (error) {
    console.error('Failed to upload products:', error);
    res.status(500).json({ error: 'Failed to upload products' });
  }
};



export const uploadMiddleware = upload.single('file');



export const uploadSingleItem =  async (req: RequestType, res: Response) =>{
  try{
    const body = req.body;
    body.tags = body.tags?.split(",");
    body.quantity = parseInt(body.quantity);
    body.cost = parseFloat(body.cost);
    body.price = parseFloat(body.price);
    body.reorderQuantity = parseInt(body.reorderQuantity);
    body.expiryDate = new Date(body.expiryDate);
    
    const newItem = await prisma.items.create({
      data: body
    });
    return res.status(201).json(newItem);

  }catch(err:any){
    return res.status(500).json({error: err.message})
  }
};

export const updateItem = async (req: RequestType, res: Response) =>{
  try{
    const body = req.body;
    const id = req.params.id;
    const user = req.user;
    const filter:any = {
      id
    };
    if(user?.role === "manager"){
      filter.shopId = user.shopId
    }
    const updatedProduct = await prisma.items.update({
      where: filter,
      data: body,
    });
    return res.status(201).json(updatedProduct);
  }catch(err:any){
    return res.status(500).json({error: err.message})
  }
};

export const getAllItems = async (req: RequestType, res: Response) =>{
  try{
    const filter:any = {};
    const user = req.user;
    // if(user?.role === "manager" || user.role === "staff"){
    //   filter.shopId = user.shopId
    // }
    const items = await prisma.items.findMany({
      where: filter
    });
    return res.status(200).json(items);
  }catch(error:any){
    return res.status(500).json({error: error.message});
  }
};

export const createProduct = async (req: RequestType, res: Response) => {
  try{
    const body = req.body;
  }catch(err:any){
    return res.json({error: err.message});
  }
}

export const getOneItem = async (req: RequestType, res: Response) =>{
  try{
    const {id} = req.params;
    const user = req.user;
    const filter:any = {
      id:id
    };
    if(user?.role !== "admin"){
      filter.shopId = user?.shopId
    }
    const item = await prisma.items.findFirst({
      where: filter,
      include: {category:true}
    });
    return res.status(200).json(item);
  }catch(error: any){
    return res.status(500).json({error: error.message});
  }
};

export const deleteProduct = async (req: RequestType, res: Response) =>{
  try{
    const {id} = req.params;
    const item = await prisma.items.delete({
      where: {
        id
      }
    });
    return res.status(201).json(item);
  }catch(error: any){
    return res.status(500).json({error: error.message});
  }
}



