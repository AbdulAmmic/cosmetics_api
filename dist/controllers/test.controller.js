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
exports.groupTestRecordByTests = exports.deleteRecord = exports.updateTestRecord = exports.getTestRecordById = exports.getTestRecords = exports.deleteTest = exports.updateTest = exports.getTestById = exports.getTests = exports.createRecord = exports.createTest = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const createTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newTest = yield prismaClient_1.prisma.tests.create({ data: body });
        return res.json(newTest).status(201);
    }
    catch (err) {
        throw err;
    }
});
exports.createTest = createTest;
const createRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newRecord = yield prismaClient_1.prisma.testRecord.create({ data: body });
        return res.json(newRecord).status(201);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.createRecord = createRecord;
const getTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filters = (_a = req.query) !== null && _a !== void 0 ? _a : {};
        const tests = yield prismaClient_1.prisma.tests.findMany({ where: filters });
        return res.json(tests).status(200);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getTests = getTests;
const getTestById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const test = yield prismaClient_1.prisma.tests.findUnique({ where: { id } });
        return res.json(test).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.getTestById = getTestById;
const updateTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const test = yield prismaClient_1.prisma.tests.update({ where: { id }, data: body });
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.updateTest = updateTest;
const deleteTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const test = yield prismaClient_1.prisma.tests.delete({ where: { id } });
        return res.json(test).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.deleteTest = deleteTest;
const getTestRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filters = (_a = req.query) !== null && _a !== void 0 ? _a : {};
        const records = yield prismaClient_1.prisma.testRecord.findMany({ where: filters, include: { customer: true } });
        return res.json(records).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.getTestRecords = getTestRecords;
const getTestRecordById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const record = yield prismaClient_1.prisma.testRecord.findUnique({ where: { id }, include: { customer: true } });
        return res.json(record).status(200);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getTestRecordById = getTestRecordById;
const updateTestRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const record = yield prismaClient_1.prisma.testRecord.update({ where: { id }, data: body });
        return res.json(record).status(200);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.updateTestRecord = updateTestRecord;
const deleteRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const record = yield prismaClient_1.prisma.testRecord.delete({ where: { id } });
        return res.json(record).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.deleteRecord = deleteRecord;
const groupTestRecordByTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all TestRecord entries with their `tests` array
        const testRecords = yield prismaClient_1.prisma.testRecord.findMany({
            select: {
                tests: true, // Only fetch the `tests` array
            },
        });
        // Flatten the tests array and count occurrences of each test
        const testCounts = testRecords
            .flatMap(record => record.tests) // Flatten all `tests` arrays
            .reduce((acc, test) => {
            acc[test] = (acc[test] || 0) + 1; // Count occurrences
            return acc;
        }, {});
        // Convert the counts into an array format
        const result = Object.entries(testCounts).map(([test, count]) => ({
            test,
            count,
        }));
        // Respond with the grouped data
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        console.error('Error grouping TestRecords:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
exports.groupTestRecordByTests = groupTestRecordByTests;
//# sourceMappingURL=test.controller.js.map