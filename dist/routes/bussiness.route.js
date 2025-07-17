"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bussinessRoute = void 0;
const express_1 = __importDefault(require("express"));
const bussiness_controller_1 = require("../controllers/bussiness.controller");
exports.bussinessRoute = express_1.default.Router();
exports.bussinessRoute.get("/", (req, res) => {
    (0, bussiness_controller_1.getAllBussinesses)(req, res);
});
exports.bussinessRoute.get("/:id", (req, res) => {
    (0, bussiness_controller_1.getBussinessById)(req, res);
});
exports.bussinessRoute.put("/:id", (req, res) => {
    (0, bussiness_controller_1.updateBussiness)(req, res);
});
exports.bussinessRoute.delete("/:id", (req, res) => {
    (0, bussiness_controller_1.deleteBussiness)(req, res);
});
exports.bussinessRoute.post("/", (req, res) => {
    (0, bussiness_controller_1.createBussiness)(req, res);
});
//# sourceMappingURL=bussiness.route.js.map