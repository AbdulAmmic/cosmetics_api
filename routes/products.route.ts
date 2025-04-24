import express, {Response} from "express";
import { RequestType } from "..";
import { bulkUploadProducts, deleteProduct, getAllItems, getOneItem, updateItem, uploadSingleItem } from "../controllers/products.controller";
import { restrictTo } from "../middlewares/restriction.middleware";
import { AuthenticateToken } from "../middlewares/auth.middleware";
// import multer from "@types/multer";
import multer from 'multer';



export const productRoute = express.Router();
const storage = multer.memoryStorage();

const upload: any = multer({ storage });

productRoute.post("/upload/bulk", upload.single('file'), (req:RequestType, res: Response)=>{
    bulkUploadProducts(req, res);
});

productRoute.post("/", (req: RequestType, res: Response)=>{
    uploadSingleItem(req, res)
});

productRoute.get("/", (req:RequestType, res:Response)=>{
    getAllItems(req, res);
} );

productRoute.get("/:id", (req:RequestType, res: Response)=>{
    getOneItem(req, res);
});

productRoute.put("/:id", (req:RequestType, res: Response) =>{
    updateItem(req, res);
});

productRoute.delete("/:id", (req: RequestType, res: Response)=>{
    deleteProduct(req, res);
});



