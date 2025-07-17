"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierRoute = void 0;
const express_1 = __importDefault(require("express"));
const supplier_controller_1 = require("../controllers/supplier.controller");
exports.supplierRoute = express_1.default.Router();
exports.supplierRoute.get("/", (req, res) => {
    (0, supplier_controller_1.getAllSuppliers)(req, res);
});
exports.supplierRoute.post("/", (req, res) => {
    (0, supplier_controller_1.createSupplier)(req, res);
});
exports.supplierRoute.get("/:id", (req, res) => {
    (0, supplier_controller_1.getSupplierById)(req, res);
});
exports.supplierRoute.put("/:id", (req, res) => {
    (0, supplier_controller_1.updateSupplier)(req, res);
});
exports.supplierRoute.delete("/:id", (req, res) => {
    (0, supplier_controller_1.deleteSupplier)(req, res);
});
//# sourceMappingURL=supplier.route.js.map