"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const auth_route_1 = require("./routes/auth.route");
const products_route_1 = require("./routes/products.route");
const sales_route_1 = require("./routes/sales.route");
const category_route_1 = require("./routes/category.route");
const bussiness_route_1 = require("./routes/bussiness.route");
const shop_route_1 = require("./routes/shop.route");
const service_route_1 = require("./routes/service.route");
const customer_route_1 = require("./routes/customer.route");
const project_route_1 = require("./routes/project.route");
const liability_route_1 = require("./routes/liability.route");
const supplier_route_1 = require("./routes/supplier.route");
const expenses_route_1 = require("./routes/expenses.route");
const test_route_1 = require("./routes/test.route");
const message_route_1 = require("./routes/message.route");
const download_controller_1 = require("./controllers/download.controller");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
app.use(express_1.default.json());
app.use("/auth", auth_route_1.authRoute);
app.use("/products", products_route_1.productRoute);
app.use("/sales", sales_route_1.salesRoute);
app.use("/category", category_route_1.categoryRoute);
app.use("/bussiness", bussiness_route_1.bussinessRoute);
app.use("/shop", shop_route_1.shopRoute);
app.use("/customer", customer_route_1.customerRoute);
app.use("/service", service_route_1.serviceRoute);
app.use("/pms", project_route_1.projectRoute);
app.use("/liability", liability_route_1.liabilityRoute);
app.use("/suppliers", supplier_route_1.supplierRoute);
app.use("/expenses", expenses_route_1.expenseRouter);
app.use("/tests", test_route_1.testRouter);
app.use("/messages", message_route_1.messageRoute);
app.get("/download-template", (req, res) => {
    (0, download_controller_1.DownloadTemplate)(req, res);
});
app.get("/download-products/:id", (req, res) => {
    (0, download_controller_1.DownloadProductData)(req, res);
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map