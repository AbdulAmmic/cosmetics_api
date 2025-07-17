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
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Function to send an email
function sendEmail(to, subject, text, html) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a transporter
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail", // or use another email service (e.g., Outlook, Yahoo)
                auth: {
                    user: "namutunciwebmail@gmail.com", // Your email address
                    pass: "ztwk gaaz nyck rnfd", // Your email password or app password
                },
            });
            // Email options
            const mailOptions = {
                from: process.env.EMAIL, // Sender email address
                to, // Recipient email address
                subject, // Email subject
                text, // Plain text body
                html, // HTML body (optional)
            };
            // Send email
            const info = yield transporter.sendMail(mailOptions);
            console.log(`Email sent: ${info.response}`);
        }
        catch (error) {
            console.error(`Error sending email: ${error.message}`);
        }
    });
}
//# sourceMappingURL=mail.js.map