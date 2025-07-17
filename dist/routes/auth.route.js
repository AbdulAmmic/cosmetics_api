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
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
exports.authRoute = express_1.default.Router();
exports.authRoute.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_controller_1.register)(req, res);
}));
exports.authRoute.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_controller_1.login)(req, res);
}));
exports.authRoute.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_controller_1.getUsers)(req, res);
}));
exports.authRoute.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_controller_1.deleteUser)(req, res);
}));
exports.authRoute.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_controller_1.updateUser)(req, res);
}));
//# sourceMappingURL=auth.route.js.map