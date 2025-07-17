import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { authRoute } from "./routes/auth.route";
import { productRoute } from "./routes/products.route";
import { salesRoute } from "./routes/sales.route";
import { categoryRoute } from "./routes/category.route";
import { bussinessRoute } from "./routes/bussiness.route";
import { shopRoute } from "./routes/shop.route";
import { serviceRoute } from "./routes/service.route";
import { customerRoute } from "./routes/customer.route";
import { projectRoute } from "./routes/project.route";
import { liabilityRoute } from "./routes/liability.route";
import { supplierRoute } from "./routes/supplier.route";
import { expenseRouter } from "./routes/expenses.route";
import { testRouter } from "./routes/test.route";
import { messageRoute } from "./routes/message.route";
import { DownloadProductData, DownloadTemplate } from "./controllers/download.controller";
import { RequestType } from ".";


config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: '*',               
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],  
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(express.json());
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/sales", salesRoute);
app.use("/category", categoryRoute);
app.use("/bussiness", bussinessRoute);
app.use("/shop", shopRoute);
app.use("/customer", customerRoute);
app.use("/service", serviceRoute);
app.use("/pms", projectRoute);
app.use("/liability", liabilityRoute);
app.use("/suppliers", supplierRoute);
app.use("/expenses", expenseRouter);
app.use("/tests", testRouter);
app.use("/messages", messageRoute);
app.get("/download-template", (req: RequestType, res: any)=>{
    DownloadTemplate(req, res);
});
app.get("/download-products/:id", (req: RequestType, res: any)=>{
    DownloadProductData(req, res);
})

app.get("/", (req, res) => {
    res.send("Hello World!");
});






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;