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
exports.deleteCustomer = exports.verifyWalletUpdate = exports.updateCustomer = exports.getCustomerById = exports.getCustomers = exports.createCustomer = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const mail_1 = require("../utils/mail");
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const customer = yield prismaClient_1.prisma.customer.create({ data: body });
        return res.status(201).json(customer);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.createCustomer = createCustomer;
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filter = (_a = req.query) !== null && _a !== void 0 ? _a : {};
        const customers = yield prismaClient_1.prisma.customer.findMany({
            where: filter,
            include: { Invoice: true }
        });
        return res.status(200).json(customers);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getCustomers = getCustomers;
const getCustomerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const customer = yield prismaClient_1.prisma.customer.findUnique({ where: { id }, include: { Invoice: true } });
        delete customer.code;
        customer.totalSpent = customer.Invoice.reduce((acc, invoice) => acc + invoice.totalCost, 0);
        customer.lastPurchaseDate = customer.Invoice[customer.Invoice.length - 1] ? customer.Invoice[customer.Invoice.length - 1].createdAt : "______";
        return res.status(200).json(customer);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getCustomerById = getCustomerById;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        const customerData = yield prismaClient_1.prisma.customer.findUnique({ where: { id } });
        if (body.walletBalance) {
            const code = customerData.code;
            if (parseFloat(code) !== parseFloat(body.code)) {
                return res.status(400).json({ error: "Invalid Code" });
            }
        }
        const customer = yield prismaClient_1.prisma.customer.update({ where: { id }, data: body });
        return res.status(201).json(customer);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.updateCustomer = updateCustomer;
const verifyWalletUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const customerData = yield prismaClient_1.prisma.customer.findUnique({ where: { id } });
        const code = Math.floor(Math.random() * 90000) + 10000;
        yield prismaClient_1.prisma.customer.update({ where: { id }, data: { code: String(code) } });
        yield (0, mail_1.sendEmail)(customerData.email, "Customer Wallet Verification", `Your Wallet Update Verification Code is ${code}`);
        return res.status(201).json({ message: "Verification Code Sent" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.verifyWalletUpdate = verifyWalletUpdate;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const customer = yield prismaClient_1.prisma.customer.delete({ where: { id } });
        return res.status(201).json(customer);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.deleteCustomer = deleteCustomer;
//# sourceMappingURL=customer.controller.js.map