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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShop = exports.getShopById = exports.getAllShops = exports.createShop = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
// Create a new Shop
const createShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, bussinessId } = req.body;
        const newShop = yield prismaClient_1.prisma.shop.create({
            data: { name, bussinessId },
        });
        return res.status(201).json(newShop);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.createShop = createShop;
// Get all Shops
const getAllShops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shops = yield prismaClient_1.prisma.shop.findMany({ include: { bussiness: true } });
        return res.status(200).json(shops);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getAllShops = getAllShops;
// export const getAllShops = async (req: RequestType, res: Response) => {};
// Get a single Shop by ID
const getShopById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const shop = yield prismaClient_1.prisma.shop.findUnique({
            where: { id },
            include: { User: true, Items: true, Invoice: true },
        });
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }
        return res.status(200).json(shop);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getShopById = getShopById;
// Delete a Shop by ID
const deleteShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prismaClient_1.prisma.shop.delete({ where: { id } });
        return res.status(200).json({ message: "Shop deleted successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.deleteShop = deleteShop;
//# sourceMappingURL=shop.controller.js.map