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
exports.deleteExpense = exports.updateExpense = exports.getExpenseById = exports.getExpenses = exports.createExpenses = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const createExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        body.date = body.date ? new Date(body.date) : new Date();
        const newExpense = yield prismaClient_1.prisma.expenses.create({ data: body });
        return res.json(newExpense).status(201);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.createExpenses = createExpenses;
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filter = (_a = req.query) !== null && _a !== void 0 ? _a : {};
        const expenses = yield prismaClient_1.prisma.expenses.findMany();
        return res.json(expenses).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.getExpenses = getExpenses;
const getExpenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const expense = yield prismaClient_1.prisma.expenses.findUnique({ where: { id } });
        return res.json(expense).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.getExpenseById = getExpenseById;
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        const expense = yield prismaClient_1.prisma.expenses.update({ where: { id }, data: body });
        return res.json(expense).status(201);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.updateExpense = updateExpense;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const expense = yield prismaClient_1.prisma.expenses.delete({ where: { id } });
        return res.json(expense).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.deleteExpense = deleteExpense;
//# sourceMappingURL=expenses.controller.js.map