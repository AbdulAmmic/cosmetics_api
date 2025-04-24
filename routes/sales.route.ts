import express, { Response } from "express";
import { RequestType } from "..";
import { calculateTotalProfit, createSales, getAllSales, getDashboardStats, getInvoices, getOneInvoice, getOneSale, getSalesDataStats, getTodaysSales, getTotalSalesByPeriod, handleDeleteInvoice, handleReturn, lineChart, sendInvoiceConfirmationOTP, updateInvoice } from "../controllers/sales.controller";
import { AuthenticateToken } from "../middlewares/auth.middleware";
export const salesRoute = express.Router();


salesRoute.get("/profit/0", async (req: RequestType, res: Response) => {
    calculateTotalProfit(req, res);
});

salesRoute.get("/today/0", async (req: RequestType, res: Response) => {
    getTodaysSales(req, res);
});

salesRoute.post("/", AuthenticateToken, async (req: RequestType, res: Response) => {
    createSales(req, res);
});

salesRoute.get("/summary/0", async (req: RequestType, res: Response) => {
    getTotalSalesByPeriod(req, res);
});

salesRoute.get("/", async (req: RequestType, res: Response) => {
    getAllSales(req, res);
});

salesRoute.get("/:id", async (req: RequestType, res: Response) => {
    getOneSale(req, res);
});

salesRoute.get("/dashboard/stats",AuthenticateToken,async (req: RequestType, res: Response) => {
    getDashboardStats(req, res);
})

salesRoute.get("/invoice/:id", AuthenticateToken, async (req: RequestType, res: Response) => {
    getOneInvoice(req, res);
});

salesRoute.get("/delete/invoice/:id", async (req: RequestType, res: Response) => {
    handleDeleteInvoice(req, res);
});
salesRoute.get("/1/invoice/", AuthenticateToken, async (req: RequestType, res: Response) => {
    getInvoices(req, res);
});
salesRoute.put("/invoice/:id", AuthenticateToken, async (req: RequestType, res: Response) => {
    updateInvoice(req, res);
})

salesRoute.get("/stats/dash", AuthenticateToken, async (req: RequestType, res: Response) => {
    getSalesDataStats(req, res);
});

salesRoute.post("/invoice/:id/send-mail", AuthenticateToken, async (req: RequestType, res: Response) => {
    sendInvoiceConfirmationOTP(req, res);
});

salesRoute.get("/dashboard/line-chart", async (req: RequestType, res: Response) => {
    lineChart(req, res);
});

salesRoute.put("/1/return", async (req: RequestType, res: Response) => {
    handleReturn(req, res);
})