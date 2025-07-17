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
exports.AuthenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = require("../prisma/prismaClient");
const JWT_SECRET = "Shhhhhhhhhhhh!";
const AuthenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    console.log("Header", authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Login First!" });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token", token });
        }
        const decodedPayload = decoded;
        const user = yield prismaClient_1.prisma.user.findFirst({ where: { id: decodedPayload.userID }, include: { bussiness: true, shop: true, recieved: { include: { sender: true } } } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    }));
});
exports.AuthenticateToken = AuthenticateToken;
//# sourceMappingURL=auth.middleware.js.map