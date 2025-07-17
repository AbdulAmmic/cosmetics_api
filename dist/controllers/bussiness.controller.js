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
exports.updateBussiness = exports.deleteBussiness = exports.getBussinessById = exports.getAllBussinesses = exports.createBussiness = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
// Create a new Bussiness
const createBussiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const newBussiness = yield prismaClient_1.prisma.bussiness.create({
            data: { name, email },
        });
        return res.status(201).json(newBussiness);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.createBussiness = createBussiness;
// Get all Bussinesses
const getAllBussinesses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bussinesses = yield prismaClient_1.prisma.bussiness.findMany();
        return res.status(200).json(bussinesses);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getAllBussinesses = getAllBussinesses;
// Get a single Bussiness by ID
const getBussinessById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const bussiness = yield prismaClient_1.prisma.bussiness.findUnique({
            where: { id },
            include: { users: true, Shop: true, Items: true, Invoice: true },
        });
        if (!bussiness) {
            return res.status(404).json({ message: "Bussiness not found" });
        }
        return res.status(200).json(bussiness);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getBussinessById = getBussinessById;
// Delete a Bussiness by ID
const deleteBussiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prismaClient_1.prisma.bussiness.delete({ where: { id } });
        return res.status(200).json({ message: "Bussiness deleted successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.deleteBussiness = deleteBussiness;
// Update a Bussiness Info
const updateBussiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const bussiness = yield prismaClient_1.prisma.bussiness.update({ where: { id }, data: req.body });
        return res.status(201).json(bussiness);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.updateBussiness = updateBussiness;
//# sourceMappingURL=bussiness.controller.js.map