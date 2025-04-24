"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getOneItem = exports.createProduct = exports.getAllItems = exports.updateItem = exports.uploadSingleItem = exports.uploadMiddleware = exports.bulkUploadProducts = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const multer_1 = __importDefault(require("multer"));
const xlsx_1 = __importDefault(require("xlsx"));
// Configure multer to store files in memory
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
function excelDateToJSDate(serial) {
    const excelBaseDate = new Date(1899, 11, 30);
    const daysToMilliseconds = serial * 24 * 60 * 60 * 1000;
    return new Date(excelBaseDate.getTime() + daysToMilliseconds);
}
const bulkUploadProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload an Excel file' });
        }
        const { shop_id } = req.body;
        // Read the uploaded Excel file from the buffer
        const workbook = xlsx_1.default.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx_1.default.utils.sheet_to_json(worksheet);
        // Map the data to the required format
        const products = data.map((item) => {
            var _a;
            let expiryDate = null;
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
                sku: ((_a = item.SKU) === null || _a === void 0 ? void 0 : _a.toString()) ? item.SKU.toString() : String(data.indexOf(item) + 1),
                description: item.Description ? item.Description : "",
                reorderQuantity: item['Reorder Quantity'] ? item['Reorder Quantity'] : 0,
                brand: item.Brand ? item.Brand : item['Item Name'],
                unit: item.Unit ? item.unit : "null",
                discountPercentage: item.Discount,
                expiryDate: null,
                shopId: shop_id
                // Convert to ISO string for Prisma
            };
        });
        const filteredProducts = products.filter((product) => product.name !== null);
        // Insert the products into the database
        const createdProducts = yield prismaClient_1.prisma.items.createMany({
            data: filteredProducts,
        });
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(201).json({ message: 'Products uploaded successfully', createdProducts });
    }
    catch (error) {
        console.error('Failed to upload products:', error);
        res.status(500).json({ error: 'Failed to upload products' });
    }
});
exports.bulkUploadProducts = bulkUploadProducts;
exports.uploadMiddleware = upload.single('file');
const uploadSingleItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const body = req.body;
        body.tags = (_a = body.tags) === null || _a === void 0 ? void 0 : _a.split(",");
        body.quantity = parseInt(body.quantity);
        body.cost = parseFloat(body.cost);
        body.price = parseFloat(body.price);
        body.reorderQuantity = parseInt(body.reorderQuantity);
        body.expiryDate = new Date(body.expiryDate);
        const newItem = yield prismaClient_1.prisma.items.create({
            data: body
        });
        return res.status(201).json(newItem);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.uploadSingleItem = uploadSingleItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        const user = req.user;
        const filter = {
            id
        };
        if ((user === null || user === void 0 ? void 0 : user.role) === "manager") {
            filter.shopId = user.shopId;
        }
        const updatedProduct = yield prismaClient_1.prisma.items.update({
            where: filter,
            data: body,
        });
        return res.status(201).json(updatedProduct);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.updateItem = updateItem;
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {};
        const user = req.user;
        // if(user?.role === "manager" || user.role === "staff"){
        //   filter.shopId = user.shopId
        // }
        const items = yield prismaClient_1.prisma.items.findMany({
            where: filter
        });
        return res.status(200).json(items);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getAllItems = getAllItems;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
    }
    catch (err) {
        return res.json({ error: err.message });
    }
});
exports.createProduct = createProduct;
const getOneItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        const filter = {
            id: id
        };
        if ((user === null || user === void 0 ? void 0 : user.role) !== "admin") {
            filter.shopId = user === null || user === void 0 ? void 0 : user.shopId;
        }
        const item = yield prismaClient_1.prisma.items.findFirst({
            where: filter,
            include: { category: true }
        });
        return res.status(200).json(item);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getOneItem = getOneItem;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const item = yield prismaClient_1.prisma.items.delete({
            where: {
                id
            }
        });
        return res.status(201).json(item);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.controller.js.map