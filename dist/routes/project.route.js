"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoute = void 0;
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("../controllers/project.controller");
exports.projectRoute = express_1.default.Router();
exports.projectRoute.get("/", (req, res) => {
    (0, project_controller_1.getProjects)(req, res);
});
exports.projectRoute.get("/:id", (req, res) => {
    (0, project_controller_1.getProjectById)(req, res);
});
exports.projectRoute.post("/", (req, res) => {
    (0, project_controller_1.createProject)(req, res);
});
exports.projectRoute.put("/:id", (req, res) => {
    (0, project_controller_1.updateProject)(req, res);
});
exports.projectRoute.delete("/:id", (req, res) => {
    (0, project_controller_1.deleteProject)(req, res);
});
exports.projectRoute.get("/task", (req, res) => {
    (0, project_controller_1.getTasks)(req, res);
});
exports.projectRoute.get("/task/:id", (req, res) => {
    (0, project_controller_1.getTaskbyId)(req, res);
});
exports.projectRoute.put("/task/:id", (req, res) => {
    (0, project_controller_1.updateTask)(req, res);
});
exports.projectRoute.post("/task", (req, res) => {
    (0, project_controller_1.createTask)(req, res);
});
exports.projectRoute.post("/worker", (req, res) => {
    (0, project_controller_1.createWorker)(req, res);
});
exports.projectRoute.get("/worker", (req, res) => {
    (0, project_controller_1.getWorkers)(req, res);
});
exports.projectRoute.get("/worker/:id", (req, res) => {
    (0, project_controller_1.getWorkerById)(req, res);
});
exports.projectRoute.put("/worker/:id", (req, res) => {
    (0, project_controller_1.updateWorker)(req, res);
});
exports.projectRoute.delete("/worker/:id", (req, res) => {
    (0, project_controller_1.deleteWorker)(req, res);
});
//# sourceMappingURL=project.route.js.map