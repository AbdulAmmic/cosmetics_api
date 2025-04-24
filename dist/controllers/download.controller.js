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
exports.DownloadProductData = exports.DownloadTemplate = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const xlsx_1 = __importDefault(require("xlsx"));
const axios_1 = __importDefault(require("axios"));
const DownloadTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = "https://res.cloudinary.com/doxklmomb/raw/upload/v1736183165/EXCEL_TEMPLATE_afk1ad.xlsx";
        const response = yield axios_1.default.get(filePath, { responseType: 'arraybuffer' });
        const workbook = xlsx_1.default.read(response.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[sheetName];
        const categories = yield prismaClient_1.prisma.category.findMany();
        console.log(categories);
        let count = 0;
        worksheet['!ref'] = `A1:B${categories.length + 1}`;
        for (const category of categories) {
            worksheet[`A${count + 2}`] = { v: category.name, t: 's' };
            worksheet[`B${count + 2}`] = { v: category.id, t: 's' };
            count++;
        }
        worksheet['A1'] = { v: 'Modified Value', t: 's' };
        const updatedBuffer = xlsx_1.default.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Disposition', 'attachment; filename=modified-example.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return res.send(updatedBuffer);
    }
    catch (err) {
        return res.json({ message: err.message });
    }
});
exports.DownloadTemplate = DownloadTemplate;
const DownloadProductData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filePath = "https://res.cloudinary.com/doxklmomb/raw/upload/v1736183165/EXCEL_TEMPLATE_afk1ad.xlsx";
        const response = yield axios_1.default.get(filePath, { responseType: 'arraybuffer' });
        const workbook = xlsx_1.default.read(response.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const products = yield prismaClient_1.prisma.items.findMany({ where: { shopId: req.params.id }, include: { category: true } });
        worksheet['!ref'] = `A1:O${products.length + 1}`;
        let count = 0;
        for (const product of products) {
            //s/n, name, quantity, cost, price, barCode, sku, Description, ReorderQ, brand, unit, Discount, expoiry, categoryId 
            worksheet[`A${count + 2}`] = { v: count + 1, t: 's' };
            worksheet[`B${count + 2}`] = { v: product === null || product === void 0 ? void 0 : product.name, t: 's' };
            worksheet[`C${count + 2}`] = { v: (_a = product === null || product === void 0 ? void 0 : product.category) === null || _a === void 0 ? void 0 : _a.name, t: 's' };
            worksheet[`D${count + 2}`] = { v: product === null || product === void 0 ? void 0 : product.quantity, t: 's' };
            worksheet[`E${count + 2}`] = { v: product === null || product === void 0 ? void 0 : product.cost, t: 's' };
            worksheet[`F${count + 2}`] = { v: product === null || product === void 0 ? void 0 : product.price, t: "s" };
            worksheet[`G${count + 2}`] = { v: product === null || product === void 0 ? void 0 : product.barCode, t: "s" };
            worksheet[`H${count + 2}`] = { v: product === null || product === void 0 ? void 0 : product.sku, t: "s" };
            worksheet[`I${count + 2}`] = { v: product === null || product === void 0 ? void 0 : product.description, t: "s" };
            worksheet[`J${count + 2}`] = { v: product === null || product === void 0 ? void 0 : product.reorderQuantity, t: "s" };
            worksheet[`K${count + 2}`] = { v: product === null || product === void 0 ? void 0 : product.brand, t: "s" };
            worksheet[`L${count + 2}`] = { v: product === null || product === void 0 ? void 0 : product.unit, t: "s" };
            worksheet[`M${count + 2}`] = { v: product === null || product === void 0 ? void 0 : product.discountPercentage, t: "s" };
            worksheet[`N${count + 2}`] = { v: product === null || product === void 0 ? void 0 : product.expiryDate, t: "s" };
            worksheet[`O${count + 2}`] = { v: product === null || product === void 0 ? void 0 : product.categoryID, t: "s" };
            count++;
        }
        const updatedBuffer = xlsx_1.default.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Disposition', 'attachment; filename=modified-example.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return res.send(updatedBuffer);
    }
    catch (err) {
        console.error(err);
        return res.json({ message: err.message, error: err.stack }).status(500);
    }
});
exports.DownloadProductData = DownloadProductData;
//# sourceMappingURL=download.controller.js.map