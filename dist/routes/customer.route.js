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
exports.customerRoute = void 0;
// import { prisma } from "../prisma/prismaClient";
const customer_controller_1 = require("../controllers/customer.controller");
const express_1 = __importDefault(require("express"));
exports.customerRoute = express_1.default.Router();
exports.customerRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, customer_controller_1.getCustomers)(req, res);
}));
exports.customerRoute.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, customer_controller_1.getCustomerById)(req, res);
}));
exports.customerRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, customer_controller_1.createCustomer)(req, res);
}));
exports.customerRoute.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, customer_controller_1.updateCustomer)(req, res);
}));
exports.customerRoute.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, customer_controller_1.deleteCustomer)(req, res);
}));
exports.customerRoute.get("/verify/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, customer_controller_1.verifyWalletUpdate)(req, res);
}));
//# sourceMappingURL=customer.route.js.map