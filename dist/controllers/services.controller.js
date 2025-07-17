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
exports.deleteResult = exports.updateResult = exports.getResultById = exports.createResult = exports.getResults = exports.deleteService = exports.updateService = exports.getServiceById = exports.getServices = exports.createService = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newService = yield prismaClient_1.prisma.services.create({
            data: body,
        });
        return res.json(newService).status(201);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.createService = createService;
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filter = (_a = req.query) !== null && _a !== void 0 ? _a : {};
        const services = yield prismaClient_1.prisma.services.findMany();
        return res.json(services).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.getServices = getServices;
const getServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const service = yield prismaClient_1.prisma.services.findUnique({ where: { id } });
        return res.json(service).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.getServiceById = getServiceById;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        const service = yield prismaClient_1.prisma.services.update({ where: { id }, data: body });
        return res.json(service).status(201);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.updateService = updateService;
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const service = yield prismaClient_1.prisma.services.delete({ where: { id } });
        return res.json(service).status(201);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.deleteService = deleteService;
const getResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filter = (_a = req.query) !== null && _a !== void 0 ? _a : {};
        const results = yield prismaClient_1.prisma.result.findMany();
        return res.json(results).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.getResults = getResults;
const createResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = yield prismaClient_1.prisma.result.create({
            data: body
        });
        return res.json(result).status(201);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.createResult = createResult;
const getResultById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield prismaClient_1.prisma.result.findUnique({ where: { id } });
        return res.json(result).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.getResultById = getResultById;
const updateResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        const result = yield prismaClient_1.prisma.result.update({ where: { id }, data: body });
        return res.json(result).status(201);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.updateResult = updateResult;
const deleteResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield prismaClient_1.prisma.result.delete({ where: { id } });
        return res.json(result).status(201);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.deleteResult = deleteResult;
//# sourceMappingURL=services.controller.js.map