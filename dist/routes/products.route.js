"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controllers/products.controller");
// import multer from "@types/multer";
const multer_1 = __importDefault(require("multer"));
exports.productRoute = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
exports.productRoute.post("/upload/bulk", upload.single('file'), (req, res) => {
    (0, products_controller_1.bulkUploadProducts)(req, res);
});
exports.productRoute.post("/", (req, res) => {
    (0, products_controller_1.uploadSingleItem)(req, res);
});
exports.productRoute.get("/", (req, res) => {
    (0, products_controller_1.getAllItems)(req, res);
});
exports.productRoute.get("/:id", (req, res) => {
    (0, products_controller_1.getOneItem)(req, res);
});
exports.productRoute.put("/:id", (req, res) => {
    (0, products_controller_1.updateItem)(req, res);
});
exports.productRoute.delete("/:id", (req, res) => {
    (0, products_controller_1.deleteProduct)(req, res);
});
//# sourceMappingURL=products.route.js.map