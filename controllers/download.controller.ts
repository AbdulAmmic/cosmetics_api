import { RequestType } from "..";
import { Response } from "express";
import { prisma } from "../prisma/prismaClient";
import XLSX from 'xlsx';
import axios from "axios";



export const DownloadTemplate = async (req: RequestType, res: Response) => {
    try{
        const filePath = "https://res.cloudinary.com/doxklmomb/raw/upload/v1736183165/EXCEL_TEMPLATE_afk1ad.xlsx";
        const response = await axios.get(filePath, { responseType: 'arraybuffer' });
        const workbook = XLSX.read(response.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[sheetName];
        const categories = await prisma.category.findMany();
        console.log(categories);
        let count = 0;
        worksheet['!ref'] = `A1:B${categories.length + 1}`;
        for (const category of categories) {
            worksheet[`A${count + 2}`] = { v: category.name, t: 's' };
            worksheet[`B${count + 2}`] = { v: category.id, t: 's' };
            count++;
        }
        worksheet['A1'] = { v: 'Modified Value', t: 's' };
        const updatedBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Disposition', 'attachment; filename=modified-example.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return res.send(updatedBuffer);
        
     
    }catch(err:any){
        return res.json({message: err.message})
    }
};

export const DownloadProductData = async (req: RequestType, res: Response) =>{
    try{
        const filePath = "https://res.cloudinary.com/doxklmomb/raw/upload/v1736183165/EXCEL_TEMPLATE_afk1ad.xlsx";
        const response = await axios.get(filePath, { responseType: 'arraybuffer' });
        const workbook = XLSX.read(response.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const products = await prisma.items.findMany({where: {shopId: req.params.id }, include: {category:true}})
        worksheet['!ref'] = `A1:O${products.length + 1}`;
        let count = 0;
        for (const product of products){
            //s/n, name, quantity, cost, price, barCode, sku, Description, ReorderQ, brand, unit, Discount, expoiry, categoryId 
            worksheet[`A${count + 2}`] = { v: count + 1, t: 's' };
            worksheet[`B${count + 2}`] = { v: product?.name, t: 's' };
            worksheet[`C${count + 2}`] = { v: product?.category?.name, t: 's' };
            worksheet[`D${count + 2}`] = { v: product?.quantity, t: 's' };
            worksheet[`E${count + 2}`] = { v: product?.cost, t: 's'};
            worksheet[`F${count + 2}`] = { v: product?.price, t: "s"};
            worksheet[`G${count + 2}`] = { v: product?.barCode, t: "s"};
            worksheet[`H${count + 2}`] = { v: product?.sku, t: "s"};
            worksheet[`I${count + 2}`] = { v: product?.description, t: "s"};
            worksheet[`J${count + 2}`] = { v: product?.reorderQuantity, t: "s"};
            worksheet[`K${count + 2}`] = { v: product?.brand, t: "s"};
            worksheet[`L${count + 2}`] = { v: product?.unit, t: "s"};
            worksheet[`M${count + 2}`] = { v: product?.discountPercentage, t: "s"};
            worksheet[`N${count + 2}`] = { v: product?.expiryDate, t: "s"};
            worksheet[`O${count + 2}`] = { v: product?.categoryID, t: "s"};
            count++;
        }
        const updatedBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Disposition', 'attachment; filename=modified-example.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return res.send(updatedBuffer);

    }catch(err:any){
        console.error(err);
        return res.json({message: err.message, error: err.stack}).status(500);
    }
}