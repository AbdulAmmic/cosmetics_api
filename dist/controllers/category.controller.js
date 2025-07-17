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
exports.deleteCategory = exports.editCategory = exports.getCategories = exports.createCategory = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const category = yield prismaClient_1.prisma.category.create({ data: body });
        return res.status(201).json(category);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.createCategory = createCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prismaClient_1.prisma.category.findMany();
        return res.status(200).json(categories);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getCategories = getCategories;
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        const category = yield prismaClient_1.prisma.category.update({ where: { id }, data: body });
        return res.status(201).json(category);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.editCategory = editCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const category = yield prismaClient_1.prisma.category.delete({ where: { id } });
        return res.status(201).json(category);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map