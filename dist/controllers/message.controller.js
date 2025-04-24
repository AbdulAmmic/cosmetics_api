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
exports.groupMessagesByReceiver = exports.groupMessagesBySender = exports.deleteMessage = exports.updateMessage = exports.getMessageById = exports.getMessages = exports.createMessage = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
// Create a new message
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        delete body.senderId;
        body.sender = { connect: { id: req.user.id } };
        const newMessage = yield prismaClient_1.prisma.message.create({ data: body });
        return res.status(201).json(newMessage);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.createMessage = createMessage;
// Get all messages
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filters = (_a = req.query) !== null && _a !== void 0 ? _a : {};
        const messages = yield prismaClient_1.prisma.message.findMany({
            where: filters,
            include: { sender: true, receiver: true },
        });
        return res.status(200).json(messages);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getMessages = getMessages;
// Get a specific message by ID
const getMessageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const message = yield prismaClient_1.prisma.message.findUnique({
            where: { id },
            include: { sender: true, receiver: true },
        });
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        return res.status(200).json(message);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getMessageById = getMessageById;
// Update a message
const updateMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedMessage = yield prismaClient_1.prisma.message.update({
            where: { id },
            data: body,
        });
        return res.status(200).json(updatedMessage);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.updateMessage = updateMessage;
// Delete a message
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedMessage = yield prismaClient_1.prisma.message.delete({ where: { id } });
        return res.status(200).json(deletedMessage);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.deleteMessage = deleteMessage;
// Group messages by sender
const groupMessagesBySender = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch messages grouped by senderId
        const messages = yield prismaClient_1.prisma.message.groupBy({
            by: ["senderId"],
            _count: {
                id: true,
            },
        });
        const result = messages.map(({ senderId, _count }) => ({
            senderId,
            messageCount: _count.id,
        }));
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        console.error("Error grouping messages by sender:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.groupMessagesBySender = groupMessagesBySender;
// Group messages by receiver
const groupMessagesByReceiver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch messages grouped by receiverId
        const messages = yield prismaClient_1.prisma.message.groupBy({
            by: ["receiverId"],
            _count: {
                id: true,
            },
        });
        const result = messages.map(({ receiverId, _count }) => ({
            receiverId,
            messageCount: _count.id,
        }));
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        console.error("Error grouping messages by receiver:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.groupMessagesByReceiver = groupMessagesByReceiver;
//# sourceMappingURL=message.controller.js.map