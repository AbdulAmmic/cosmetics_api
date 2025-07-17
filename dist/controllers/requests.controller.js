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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequest = exports.editRequest = exports.getOneRequest = exports.getRequests = exports.createRequest = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const createRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newRequest = yield prismaClient_1.prisma.requests.create({ data: body });
        return res.json(newRequest).status(201);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.createRequest = createRequest;
const getRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filters = (_a = req.query) !== null && _a !== void 0 ? _a : {};
        const requests = yield prismaClient_1.prisma.requests.findMany({ where: filters });
        return res.json(requests).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.getRequests = getRequests;
const getOneRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const request = yield prismaClient_1.prisma.requests.findUnique({ where: { id } });
        return res.json(request).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.getOneRequest = getOneRequest;
const editRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        const request = yield prismaClient_1.prisma.requests.update({ where: { id }, data: body });
        return res.json(request).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.editRequest = editRequest;
const deleteRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const request = yield prismaClient_1.prisma.requests.delete({ where: { id } });
        return res.json(request).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.deleteRequest = deleteRequest;
//# sourceMappingURL=requests.controller.js.map