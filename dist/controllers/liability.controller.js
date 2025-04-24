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
exports.deleteLiability = exports.updateLiability = exports.getLiabilities = exports.createLiability = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const createLiability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const liability = yield prismaClient_1.prisma.liability.create({ data });
        return res.json(liability).status(201);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.createLiability = createLiability;
const getLiabilities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const liabilities = yield prismaClient_1.prisma.liability.findMany();
        return res.json(liabilities).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.getLiabilities = getLiabilities;
const updateLiability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        const liability = yield prismaClient_1.prisma.liability.update({ where: { id }, data: body });
        return res.json(liability).status(201);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.updateLiability = updateLiability;
const deleteLiability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const liability = yield prismaClient_1.prisma.liability.delete({ where: { id } });
        return res.json(liability).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.deleteLiability = deleteLiability;
//# sourceMappingURL=liability.controller.js.map