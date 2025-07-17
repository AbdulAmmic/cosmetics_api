"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoute = void 0;
const services_controller_1 = require("../controllers/services.controller");
const express_1 = __importDefault(require("express"));
exports.serviceRoute = express_1.default.Router();
exports.serviceRoute.get("/", (req, res) => {
    (0, services_controller_1.getServices)(req, res);
});
exports.serviceRoute.get("/:id", (req, res) => {
    (0, services_controller_1.getServiceById)(req, res);
});
exports.serviceRoute.post("/", (req, res) => {
    (0, services_controller_1.createService)(req, res);
});
exports.serviceRoute.put("/:id", (req, res) => {
    (0, services_controller_1.updateService)(req, res);
});
exports.serviceRoute.delete("/:id", (req, res) => {
    (0, services_controller_1.deleteService)(req, res);
});
exports.serviceRoute.get("/result", (req, res) => {
    (0, services_controller_1.getResults)(req, res);
});
exports.serviceRoute.get("/result/:id", (req, res) => {
    (0, services_controller_1.getResultById)(req, res);
});
exports.serviceRoute.post("/result", (req, res) => {
    (0, services_controller_1.createResult)(req, res);
});
//# sourceMappingURL=service.route.js.map