"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsRoute = void 0;
const express_1 = __importDefault(require("express"));
const requests_controller_1 = require("../controllers/requests.controller");
exports.requestsRoute = express_1.default.Router();
exports.requestsRoute.get("/", (req, res) => {
    (0, requests_controller_1.getRequests)(req, res);
});
exports.requestsRoute.post("/", (req, res) => {
    (0, requests_controller_1.createRequest)(req, res);
});
exports.requestsRoute.get("/:id", (req, res) => {
    (0, requests_controller_1.getOneRequest)(req, res);
});
exports.requestsRoute.put("/:id", (req, res) => {
    (0, requests_controller_1.editRequest)(req, res);
});
//# sourceMappingURL=requests.route.js.map