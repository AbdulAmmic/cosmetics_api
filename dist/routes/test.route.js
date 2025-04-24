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
exports.testRouter = void 0;
const express_1 = __importDefault(require("express"));
const test_controller_1 = require("../controllers/test.controller");
exports.testRouter = express_1.default.Router();
exports.testRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, test_controller_1.getTests)(req, res);
}));
exports.testRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, test_controller_1.createTest)(req, res);
}));
exports.testRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, test_controller_1.getTestById)(req, res);
}));
exports.testRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, test_controller_1.deleteTest)(req, res);
}));
exports.testRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, test_controller_1.updateTest)(req, res);
}));
exports.testRouter.post("/test/record", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, test_controller_1.createRecord)(req, res);
}));
exports.testRouter.get("/test/record", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, test_controller_1.getTestRecords)(req, res);
}));
exports.testRouter.get("/test/record/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, test_controller_1.getTestRecordById)(req, res);
}));
exports.testRouter.delete("/test/record/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, test_controller_1.deleteRecord)(req, res);
}));
exports.testRouter.put("/test/record/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, test_controller_1.updateTestRecord)(req, res);
}));
exports.testRouter.get("/test/stats", (req, res) => {
    (0, test_controller_1.groupTestRecordByTests)(req, res);
});
//# sourceMappingURL=test.route.js.map