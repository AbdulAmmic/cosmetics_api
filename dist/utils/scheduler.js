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
exports.StartAction = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const prismaClient_1 = require("../prisma/prismaClient");
const mail_1 = require("./mail");
const StartAction = () => {
    node_cron_1.default.schedule("0 00 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Get total sales Today
            const today = new Date();
            const shops = yield prismaClient_1.prisma.shop.findMany({ include: { bussiness: true, Invoice: true } });
            let message = `Hello Today's sales are as follows \n\n `;
            for (const shop of shops) {
                let todayInvoice = shop.Invoice.find((invoice) => {
                    return new Date(invoice.createdAt).setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
                });
                message += `${shop.name}: ${todayInvoice.totalPrice}`;
            }
            ;
            const subject = 'Sales Summary';
            yield (0, mail_1.sendEmail)("connectorstech@gmail.com", subject, message);
            yield (0, mail_1.sendEmail)("abukhamsa@gmail.com", subject, message);
            //    await sendEmail("namutunciwebmail@gmail.com", subject, message);
        }
        catch (err) {
            console.error("Error updating attendance status:", err);
        }
    }), { scheduled: true, timezone: "Africa/Lagos" });
};
exports.StartAction = StartAction;
//# sourceMappingURL=scheduler.js.map