import { prisma } from "../prisma/prismaClient";
import { RequestType } from "..";
import { Response } from "express";

// Create a new message
export const createMessage = async (req: RequestType, res: Response) => {
  try {
    const body = req.body;
    delete body.senderId;
    body.sender = { connect: { id: req.user.id } };
    const newMessage = await prisma.message.create({ data: body });
    return res.status(201).json(newMessage);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Get all messages
export const getMessages = async (req: RequestType, res: Response) => {
  try {
    const filters = req.query ?? {};
    const messages = await prisma.message.findMany({
      where: filters,
      include: { sender: true, receiver: true },
    });
    return res.status(200).json(messages);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Get a specific message by ID
export const getMessageById = async (req: RequestType, res: Response) => {
  try {
    const { id } = req.params;
    const message = await prisma.message.findUnique({
      where: { id },
      include: { sender: true, receiver: true },
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    return res.status(200).json(message);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Update a message
export const updateMessage = async (req: RequestType, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedMessage = await prisma.message.update({
      where: { id },
      data: body,
    });

    return res.status(200).json(updatedMessage);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete a message
export const deleteMessage = async (req: RequestType, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMessage = await prisma.message.delete({ where: { id } });
    return res.status(200).json(deletedMessage);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Group messages by sender
export const groupMessagesBySender = async (req: RequestType, res: Response) => {
  try {
    // Fetch messages grouped by senderId
    const messages = await prisma.message.groupBy({
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
  } catch (err: any) {
    console.error("Error grouping messages by sender:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Group messages by receiver
export const groupMessagesByReceiver = async (req: RequestType, res: Response) => {
  try {
    // Fetch messages grouped by receiverId
    const messages = await prisma.message.groupBy({
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
  } catch (err: any) {
    console.error("Error grouping messages by receiver:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
