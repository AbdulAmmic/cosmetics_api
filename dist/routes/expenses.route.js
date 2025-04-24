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
exports.expenseRouter = void 0;
const expenses_controller_1 = require("../controllers/expenses.controller");
const express_1 = __importDefault(require("express"));
exports.expenseRouter = express_1.default.Router();
exports.expenseRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, expenses_controller_1.createExpenses)(req, res);
}));
exports.expenseRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, expenses_controller_1.getExpenses)(req, res);
}));
exports.expenseRouter.get("/:id", (req, res) => {
    (0, expenses_controller_1.getExpenseById)(req, res);
});
exports.expenseRouter.put("/:id", (req, res) => {
    (0, expenses_controller_1.updateExpense)(req, res);
});
exports.expenseRouter.delete("/:id", (req, res) => {
    (0, expenses_controller_1.deleteExpense)(req, res);
});
//# sourceMappingURL=expenses.route.js.map