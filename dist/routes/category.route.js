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
exports.categoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
exports.categoryRoute = express_1.default.Router();
exports.categoryRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, category_controller_1.getCategories)(req, res);
}));
exports.categoryRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, category_controller_1.createCategory)(req, res);
}));
exports.categoryRoute.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, category_controller_1.editCategory)(req, res);
}));
exports.categoryRoute.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, category_controller_1.deleteCategory)(req, res);
}));
//# sourceMappingURL=category.route.js.map