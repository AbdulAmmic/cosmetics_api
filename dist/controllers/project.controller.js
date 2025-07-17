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
exports.getWorkerById = exports.deleteWorker = exports.updateWorker = exports.getWorkers = exports.createWorker = exports.deleteTask = exports.updateTask = exports.getTaskbyId = exports.getTasks = exports.createTask = exports.updateProject = exports.deleteProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        body.currentBalance = body.originalBudget;
        const newProject = yield prismaClient_1.prisma.project.create({
            data: body
        });
        return res.json(newProject).status(201);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.createProject = createProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filter = (_a = req.query) !== null && _a !== void 0 ? _a : {};
        const projects = yield prismaClient_1.prisma.project.findMany({
            where: filter,
            include: { Task: true, Worker: true }
        });
        return res.json(projects).status(200);
    }
    catch (err) {
        return res.json({ err: err.message }).status(500);
    }
});
exports.getProjects = getProjects;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const project = yield prismaClient_1.prisma.project.findUnique({ where: { id }, include: { Task: true, Worker: true } });
        return res.json(project).status(200);
    }
    catch (err) {
        return res.json({ err: err.message }).status(500);
    }
});
exports.getProjectById = getProjectById;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const project = yield prismaClient_1.prisma.project.delete({ where: { id } });
        return res.json(project).status(201);
    }
    catch (err) {
        return res.json({ err: err.message }).status(500);
    }
});
exports.deleteProject = deleteProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        const project = yield prismaClient_1.prisma.project.update({ where: { id }, data: body });
        return res.json(project).status(201);
    }
    catch (err) {
        return res.json({ err: err.message }).status(500);
    }
});
exports.updateProject = updateProject;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const task = yield prismaClient_1.prisma.task.create({ data: body });
        yield prismaClient_1.prisma.project.update({
            where: { id: task.projectID },
            data: {
                currentBalance: { increment: task.price },
            }
        });
        return res.json(task).status(201);
    }
    catch (err) {
        return res.json({ err: err.message }).status(500);
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filter = (_a = req.query) !== null && _a !== void 0 ? _a : {};
        const tasks = yield prismaClient_1.prisma.task.findMany({
            where: filter,
            include: { project: true, worker: true }
        });
        return res.json(tasks).status(200);
    }
    catch (err) {
        return res.json({ err: err.message }).status(500);
    }
});
exports.getTasks = getTasks;
const getTaskbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const task = yield prismaClient_1.prisma.task.findUnique({ where: { id }, include: { project: true, worker: true } });
        return res.json(task).status(200);
    }
    catch (err) {
        return res.json({ err: err.message }).status(500);
    }
});
exports.getTaskbyId = getTaskbyId;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        const task = yield prismaClient_1.prisma.task.update({ where: { id }, data: body });
        return res.json(task).status(200);
    }
    catch (err) {
        return res.json({ err: err.message }).status(500);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield prismaClient_1.prisma.task.delete({ where: { id } });
        return res.json(task).status(200);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.deleteTask = deleteTask;
//create Worker
const createWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const worker = yield prismaClient_1.prisma.worker.create({ data: body });
        return res.json(worker).status(201);
    }
    catch (err) {
        return res.json({ err: err.message }).status(500);
    }
});
exports.createWorker = createWorker;
//getWorkers
const getWorkers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filter = (_a = req.query) !== null && _a !== void 0 ? _a : {};
        const workers = yield prismaClient_1.prisma.worker.findMany({ where: filter });
        return res.json(workers).status(200);
    }
    catch (err) {
        return res.json({ err: err.message }).status(500);
    }
});
exports.getWorkers = getWorkers;
//updateWorker
const updateWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        const worker = yield prismaClient_1.prisma.worker.update({ where: { id }, data: body });
        return res.json(worker).status(200);
    }
    catch (err) {
        return res.json({ err: err.message }).status(500);
    }
});
exports.updateWorker = updateWorker;
//deleteWorker
const deleteWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const worker = yield prismaClient_1.prisma.worker.delete({ where: { id } });
        return res.json(worker).status(200);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.deleteWorker = deleteWorker;
const getWorkerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const worker = yield prismaClient_1.prisma.worker.findUnique({ where: { id } });
        return res.json(worker).status(200);
    }
    catch (err) {
        return res.json({ err: err.message }).status(500);
    }
});
exports.getWorkerById = getWorkerById;
//# sourceMappingURL=project.controller.js.map