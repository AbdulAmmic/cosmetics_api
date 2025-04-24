"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoute = void 0;
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message.controller");
exports.messageRoute = express_1.default.Router();
exports.messageRoute.get("/", (req, res) => {
    (0, message_controller_1.getMessages)(req, res);
});
exports.messageRoute.post("/", (req, res) => {
    (0, message_controller_1.createMessage)(req, res);
});
exports.messageRoute.get("/:id", (req, res) => {
    (0, message_controller_1.getMessageById)(req, res);
});
//# sourceMappingURL=message.route.js.map