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
exports.deleteSupplier = exports.updateSupplier = exports.getSupplierById = exports.getAllSuppliers = exports.createSupplier = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const createSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        body.accountNumber = [];
        body.bank = [];
        body.accountName = [];
        body.balance = "0";
        body.status = "active";
        const supplier = yield prismaClient_1.prisma.supplier.create({
            data: body
        });
        return res.json(supplier).status(200);
    }
    catch (err) {
        return res.json({ message: err.message }).status(500);
    }
});
exports.createSupplier = createSupplier;
const getAllSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filters = (_a = req.query) !== null && _a !== void 0 ? _a : {};
        const suppliers = yield prismaClient_1.prisma.supplier.findMany({});
        return res.status(200).json(suppliers);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getAllSuppliers = getAllSuppliers;
const getSupplierById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const supplier = yield prismaClient_1.prisma.supplier.findFirst({
            where: { id }
        });
        return res.json(supplier).status(200);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getSupplierById = getSupplierById;
const updateSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const supplier = yield prismaClient_1.prisma.supplier.update({
            where: { id },
            data: req.body
        });
        return res.json(supplier).status(201);
    }
    catch (err) {
        return res.json({ message: err.message }).status(500);
    }
});
exports.updateSupplier = updateSupplier;
const deleteSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const supplier = yield prismaClient_1.prisma.supplier.delete({
            where: { id },
        });
        return res.status(500).json(supplier);
    }
    catch (err) {
        return res.json({ message: err.message }).status(500);
    }
});
exports.deleteSupplier = deleteSupplier;
//# sourceMappingURL=supplier.controller.js.map