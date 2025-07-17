"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.liabilityRoute = void 0;
const express_1 = __importDefault(require("express"));
const liability_controller_1 = require("../controllers/liability.controller");
exports.liabilityRoute = express_1.default.Router();
exports.liabilityRoute.get("/", (req, res) => {
    (0, liability_controller_1.getLiabilities)(req, res);
});
exports.liabilityRoute.post("/", (req, res) => {
    (0, liability_controller_1.createLiability)(req, res);
});
exports.liabilityRoute.put("/:id", (req, res) => {
    (0, liability_controller_1.updateLiability)(req, res);
});
exports.liabilityRoute.delete("/:id", (req, res) => {
    (0, liability_controller_1.deleteLiability)(req, res);
});
//# sourceMappingURL=liability.route.js.map