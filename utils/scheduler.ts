import cron from "node-cron";
import { prisma } from "../prisma/prismaClient";
import { sendEmail } from "./mail";

export const StartAction = () => {
    cron.schedule("0 00 * * *", async () => {
        try {
            
            //Get total sales Today
            const today = new Date();
            
           const shops = await prisma.shop.findMany({include: {bussiness: true, Invoice: true}});
           let message = `Hello Today's sales are as follows \n\n `;
           for(const shop of shops){
            let todayInvoice = shop.Invoice.find((invoice)=>{
                return new Date(invoice.createdAt).setHours(0,0,0,0) === today.setHours(0,0,0,0);
                
            });
            message += `${shop.name}: ${todayInvoice.totalPrice}`
           };
           const subject = 'Sales Summary';
           await sendEmail("connectorstech@gmail.com", subject, message);
           await sendEmail("abukhamsa@gmail.com", subject, message);
        //    await sendEmail("namutunciwebmail@gmail.com", subject, message);

        } catch (err: any) {
            console.error("Error updating attendance status:", err);
        }
    }, { scheduled: true, timezone: "Africa/Lagos" });
};
