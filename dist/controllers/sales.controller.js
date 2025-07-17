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
exports.handleDeleteInvoice = exports.handleReturn = exports.lineChart = exports.getDashboardStats = exports.sendInvoiceConfirmationOTP = exports.updateInvoice = exports.getOneInvoice = exports.getInvoices = exports.getOneSale = exports.getAllSales = exports.calculateTotalProfit = exports.getSalesDataStats = exports.getTotalSalesByPeriod = exports.getTodaysSales = exports.createSales = void 0;
// @ts-nocheck
const prismaClient_1 = require("../prisma/prismaClient");
const mail_1 = require("../utils/mail");
const createSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { items, quantities, prices, costs, paymentType, customerId, discount } = req.body;
    const user = req.user;
    const bussinessId = (user === null || user === void 0 ? void 0 : user.bussinessId) || null;
    const shopId = user === null || user === void 0 ? void 0 : user.shopId; // This could be undefined
    let totalCost = 0;
    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
        totalCost += costs[i] * quantities[i];
        totalPrice += prices[i] * quantities[i];
    }
    try {
        const invoice = yield prismaClient_1.prisma.invoice.create({
            data: {
                totalCost,
                totalPrice: totalPrice - discount,
                prices,
                quantities,
                shop: shopId ? { connect: { id: shopId } } : undefined, // Proper conditional
                bussinessId,
                items: items.map((item) => item.name),
                paymentType,
                customerId,
                status: "unconfirmed",
                userId: user.id,
            },
        });
        if (paymentType === "Wallet") {
            yield prismaClient_1.prisma.customer.update({
                where: { id: customerId },
                data: { walletBalance: { decrement: totalPrice - discount } }
            });
        }
        const fullInvoice = yield prismaClient_1.prisma.invoice.findUnique({
            where: { id: invoice.id },
            include: { shop: true, bussiness: true }
        });
        yield prismaClient_1.prisma.sales.create({
            data: {
                total: totalPrice - discount,
                invoiceId: invoice.id,
            },
        });
        // Update products quantities
        for (const item of items) {
            yield prismaClient_1.prisma.items.update({
                where: { id: item.id },
                data: { quantity: { decrement: parseInt(quantities[items.indexOf(item)]) } }
            });
        }
        return res.status(201).json(fullInvoice);
    }
    catch (error) {
        console.error("Error creating invoice:", error);
        return res.status(500).json({ error: "Failed to create invoice or sales." });
    }
});
exports.createSales = createSales;
const getTodaysSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req;
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const todaysSales = yield prismaClient_1.prisma.sales.findMany({
            where: { createdAt: { gte: start, lt: end } },
            include: { invoice: true },
        });
        return res.status(200).json(todaysSales);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getTodaysSales = getTodaysSales;
const getTotalSalesByPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const period = req.query.period;
        if (!["day", "week", "month"].includes(period)) {
            return res.status(400).json({ error: "Invalid period. Use 'day', 'week', or 'month'." });
        }
        const today = new Date();
        let start;
        let end;
        if (period === "day") {
            start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        }
        else if (period === "week") {
            const dayOfWeek = today.getDay();
            start = new Date(today);
            start.setDate(today.getDate() - dayOfWeek);
            start.setHours(0, 0, 0, 0);
            end = new Date(start);
            end.setDate(start.getDate() + 7);
        }
        else {
            start = new Date(today.getFullYear(), today.getMonth(), 1);
            end = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        }
        const sales = yield prismaClient_1.prisma.sales.findMany({
            where: { createdAt: { gte: start, lt: end } },
        });
        const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
        return res.status(200).json({ period, totalSales });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getTotalSalesByPeriod = getTotalSalesByPeriod;
const getSalesDataStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield prismaClient_1.prisma.sales.findMany();
        const customers = yield prismaClient_1.prisma.customer.findMany();
        const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
        const totalCustomers = customers.length;
        const customersWithDebts = customers.filter((customer) => customer.walletBalance < 0);
        const customerDebts = customersWithDebts.reduce((acc, customer) => acc - customer.walletBalance, 0);
        const averageSaleValue = totalSales / sales.length;
        const lastMonthSales = yield prismaClient_1.prisma.sales.findMany({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                    lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                },
            },
        });
        const lastMonthTotalSales = lastMonthSales.reduce((acc, sale) => acc + sale.total, 0);
        const salesGrowth = (totalSales - lastMonthTotalSales) / lastMonthTotalSales * 100;
        return res.status(200).json({ totalSales, totalCustomers, customerDebts, averageSaleValue, salesGrowth });
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.getSalesDataStats = getSalesDataStats;
const calculateTotalProfit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = yield prismaClient_1.prisma.invoice.findMany();
        req;
        const totalProfit = invoices.reduce((acc, invoice) => {
            return acc + (invoice.totalPrice - invoice.totalCost);
        }, 0);
        return res.status(200).json({ totalProfit });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.calculateTotalProfit = calculateTotalProfit;
const getAllSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const filter = req.query;
        if ((req === null || req === void 0 ? void 0 : req.user.role) !== 'admin')
            filter.shopId = user === null || user === void 0 ? void 0 : user.shopId;
        const sales = yield prismaClient_1.prisma.sales.findMany({
            where: filter,
            include: { invoice: true },
        });
        return res.status(200).json(sales);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getAllSales = getAllSales;
const getOneSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const filter = {
            id
        };
        if ((req === null || req === void 0 ? void 0 : req.user.role) !== 'admin')
            filter.shopId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.shopId;
        const sale = yield prismaClient_1.prisma.sales.findFirst({
            where: filter,
            include: { invoice: true },
        });
        return res.status(200).json(sale);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getOneSale = getOneSale;
const getInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const filter = req.query;
        // if(req?.user?.role !== 'admin') {filter.shopId = user?.shopId;};
        // if(req?.user?.role === 'staff') {filter.userId = user?.id};
        const invoices = yield prismaClient_1.prisma.invoice.findMany({
            where: filter,
            include: { customer: true }
        });
        return res.status(200).json(invoices);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getInvoices = getInvoices;
const getOneInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const filter = {
            id
        };
        if ((req === null || req === void 0 ? void 0 : req.user.role) !== 'admin')
            filter.shopId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.shopId;
        const invoice = yield prismaClient_1.prisma.invoice.findFirst({
            where: filter,
            include: { customer: true, shop: true }
        });
        return res.status(200).json(invoice);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.getOneInvoice = getOneInvoice;
const updateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const invoice = yield prismaClient_1.prisma.invoice.update({
            where: {
                id
            },
            data: body
        });
        return res.json(invoice).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.updateInvoice = updateInvoice;
const sendInvoiceConfirmationOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        const { code } = req.body;
        yield (0, mail_1.sendEmail)(email, "Invoice Confirmation", `Your Invoice Confirmation OTP is ${code}`);
        return res.status(201).json({ message: "OTP sent successfully", email: (_b = req.user) === null || _b === void 0 ? void 0 : _b.email });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.sendInvoiceConfirmationOTP = sendInvoiceConfirmationOTP;
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // const user = req.user;
        const filter = (_a = req.query) !== null && _a !== void 0 ? _a : {};
        const user = req.user;
        if ((req === null || req === void 0 ? void 0 : req.user.role) !== 'admin')
            filter.shopId = user === null || user === void 0 ? void 0 : user.shopId;
        if ((req === null || req === void 0 ? void 0 : req.user.role) === 'staff')
            filter.userId = user === null || user === void 0 ? void 0 : user.id;
        //get total sales
        const totalSales = (yield prismaClient_1.prisma.sales.aggregate({
            _sum: {
                total: true
            },
            where: filter
        }))._sum.total;
        //total revenue
        const totalPrice = yield prismaClient_1.prisma.invoice.aggregate({
            _sum: {
                totalPrice: true
            },
            where: filter
        });
        const totalCost = yield prismaClient_1.prisma.invoice.aggregate({
            _sum: {
                totalCost: true
            },
            where: filter
        });
        const totalProfit = totalPrice._sum.totalPrice - totalCost._sum.totalCost;
        //total Sales costs
        const totalSalesCost = totalCost._sum.totalCost;
        //total purchases
        const totalPurchases = '******';
        //total returns
        //total purchase cost
        const totalPurchaseCost = (yield prismaClient_1.prisma.items.aggregate({
            _sum: {
                cost: true,
                quantity: true
            }
        }))._sum.cost * (yield prismaClient_1.prisma.items.aggregate({
            _sum: {
                quantity: true
            }
        }))._sum.quantity;
        //total quantity
        const totalQuantity = (yield prismaClient_1.prisma.items.aggregate({
            _sum: {
                quantity: true
            }
        }))._sum.quantity;
        //total pending invoices
        const totalPendingInvoices = yield prismaClient_1.prisma.invoice.count({
            where: Object.assign({ status: "unconfirmed" }, filter)
        });
        const totalPendingInvoicesCost = yield (yield prismaClient_1.prisma.invoice.aggregate({
            _sum: {
                totalCost: true,
                totalPrice: true
            },
            where: Object.assign({ status: "unconfirmed" }, filter)
        }))._sum.totalPrice;
        //total customers
        const totalCustomers = yield prismaClient_1.prisma.customer.count();
        //total suppliers
        const totalSuppliers = yield prismaClient_1.prisma.supplier.count();
        //total employees
        const totalEmployees = yield prismaClient_1.prisma.user.count();
        //total products
        const totalProducts = yield prismaClient_1.prisma.items.count();
        //out of stock
        const outOfStock = yield prismaClient_1.prisma.items.count({
            where: {
                quantity: {
                    lte: 0
                }
            }
        });
        //low stock
        const products = yield prismaClient_1.prisma.items.findMany({});
        const lowStock = products.filter((product) => product.quantity <= product.reorderQuantity && product.quantity > 0).length;
        //low stock
        return res.json({
            totalSales,
            totalSalesCost,
            totalPurchases,
            totalPurchaseCost,
            totalProfit,
            totalQuantity,
            totalPendingInvoices: (`${totalPendingInvoices} = NGN ${(totalPendingInvoicesCost === null || totalPendingInvoicesCost === void 0 ? void 0 : totalPendingInvoicesCost.toLocaleString()) || 0}`),
            totalCustomers,
            totalSuppliers,
            totalEmployees,
            totalProducts,
            outOfStock,
            lowStock
        });
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.getDashboardStats = getDashboardStats;
const lineChart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query;
        const sales = yield prismaClient_1.prisma.sales.groupBy({
            by: ['createdAt'],
            _sum: {
                total: true,
            },
            where: filter,
        });
        const profitData = yield prismaClient_1.prisma.invoice.groupBy({
            by: ['createdAt'],
            _sum: {
                totalCost: true,
                totalPrice: true,
            },
            where: filter,
        });
        // Function to group data by month
        function groupByMonth(data, valueKey) {
            const grouped = {};
            data.forEach((item) => {
                var _a;
                const month = (_a = new Date(item.createdAt)) === null || _a === void 0 ? void 0 : _a.toLocaleString('default', { month: 'short' }).toUpperCase();
                grouped[month] = (grouped[month] || 0) + (item._sum[valueKey] || 0);
            });
            return grouped;
        }
        // Group sales data by month
        const salesByMonth = groupByMonth(sales, 'total');
        // Group profit data by month
        const profitByMonth = {};
        profitData.forEach((item) => {
            var _a;
            const month = (_a = new Date(item.createdAt)) === null || _a === void 0 ? void 0 : _a.toLocaleString('default', { month: 'short' }).toUpperCase();
            const totalPrice = item._sum.totalPrice || 0;
            const totalCost = item._sum.totalCost || 0;
            const profit = totalPrice - totalCost;
            profitByMonth[month] = (profitByMonth[month] || 0) + profit;
        });
        return res.json({ salesByMonth, profitByMonth }).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.lineChart = lineChart;
const handleReturn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { invoiceId, items, quantities, prices, totalCost, totalPrice, customerId } = req.body;
        // const user = req.user;
        const invoice = yield prismaClient_1.prisma.invoice.create({
            data: {
                totalCost,
                totalPrice: 0 - totalPrice,
                prices,
                quantities,
                items,
                paymentType: "return",
                customerId,
                status: "unconfirmed",
            },
        });
        return res.json(invoice).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.handleReturn = handleReturn;
const handleDeleteInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = req.user;
        // if(req.user?.role !== "admin") return res.json({error: "You are not authorized to perform this action"}).status(401);
        const id = req.params.id;
        const invoice = yield prismaClient_1.prisma.invoice.delete({ where: { id } });
        return res.json(invoice).status(200);
    }
    catch (err) {
        return res.json({ error: err.message }).status(500);
    }
});
exports.handleDeleteInvoice = handleDeleteInvoice;
//# sourceMappingURL=sales.controller.js.map