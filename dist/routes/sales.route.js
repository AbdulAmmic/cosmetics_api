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
exports.salesRoute = void 0;
const express_1 = __importDefault(require("express"));
const sales_controller_1 = require("../controllers/sales.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.salesRoute = express_1.default.Router();
exports.salesRoute.get("/profit/0", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.calculateTotalProfit)(req, res);
}));
exports.salesRoute.get("/today/0", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.getTodaysSales)(req, res);
}));
exports.salesRoute.post("/", auth_middleware_1.AuthenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.createSales)(req, res);
}));
exports.salesRoute.get("/summary/0", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.getTotalSalesByPeriod)(req, res);
}));
exports.salesRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.getAllSales)(req, res);
}));
exports.salesRoute.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.getOneSale)(req, res);
}));
exports.salesRoute.get("/dashboard/stats", auth_middleware_1.AuthenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.getDashboardStats)(req, res);
}));
exports.salesRoute.get("/invoice/:id", auth_middleware_1.AuthenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.getOneInvoice)(req, res);
}));
exports.salesRoute.get("/delete/invoice/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.handleDeleteInvoice)(req, res);
}));
exports.salesRoute.get("/1/invoice/", auth_middleware_1.AuthenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.getInvoices)(req, res);
}));
exports.salesRoute.put("/invoice/:id", auth_middleware_1.AuthenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.updateInvoice)(req, res);
}));
exports.salesRoute.get("/stats/dash", auth_middleware_1.AuthenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.getSalesDataStats)(req, res);
}));
exports.salesRoute.post("/invoice/:id/send-mail", auth_middleware_1.AuthenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.sendInvoiceConfirmationOTP)(req, res);
}));
exports.salesRoute.get("/dashboard/line-chart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.lineChart)(req, res);
}));
exports.salesRoute.put("/1/return", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sales_controller_1.handleReturn)(req, res);
}));
//# sourceMappingURL=sales.route.js.map