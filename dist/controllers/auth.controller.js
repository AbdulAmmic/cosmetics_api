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
exports.deleteUser = exports.updateUser = exports.getUsers = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = require("../prisma/prismaClient");
const mail_1 = require("../utils/mail");
// import { connect } from "http2";
const JWT_SECRET = "Shhhhhhhhhhhh!";
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = yield prismaClient_1.prisma.user.findFirst({ where: { email }, include: { recieved: { include: { sender: true } } } });
        if (!user)
            return res.status(401).json({ err: "Invalid Credentials" });
        // Compare plain password with hashed password in the database
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ err: "Invalid Credentials" });
        }
        // Sign the JWT token
        const token = jsonwebtoken_1.default.sign({ email: user.email }, JWT_SECRET); // Ensure JWT_SECRET is defined
        // Modify user object before sending it
        const userResponse = Object.assign(Object.assign({}, user), { password: 'private' });
        return res.status(202).json({ data: userResponse, token });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        body.password = (Math.floor(Math.random() * 90000000) + 10000000).toString(); //Random 8 digits
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(body.password, 10);
        // Check if email already exists
        const sameemail = yield prismaClient_1.prisma.user.findFirst({ where: { email: body.email } });
        if (sameemail) {
            return res.status(403).json({ err: "User already Exists" });
        }
        yield (0, mail_1.sendEmail)(body.email, "Account Password", `Your account password is ${body.password}`);
        //
        body.password = hashedPassword;
        const newUser = yield prismaClient_1.prisma.user.create({ data: body });
        return res.status(201).json(newUser);
    }
    catch (err) {
        return res.status(500).json({ err: err.message });
    }
});
exports.register = register;
/**
 * Retrieves all users from the database.
 *
 * @param req - The request object containing request details.
 * @param res - The response object used to send back the desired HTTP response.
 *
 * @returns A JSON response with the list of users or an error message.
 */
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prismaClient_1.prisma.user.findMany({ include: { shop: true, bussiness: true } });
        return res.status(200).json(users);
    }
    catch (err) {
        return res.status(500).json({ err: err.message });
    }
});
exports.getUsers = getUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        const user = yield prismaClient_1.prisma.user.update({ where: { id }, data: body });
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json({ err: err.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield prismaClient_1.prisma.user.delete({ where: { id } });
        return res.status(200).json(user);
    }
    catch (err) {
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=auth.controller.js.map