"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRoute = void 0;
const express_1 = __importDefault(require("express"));
const shop_controller_1 = require("../controllers/shop.controller");
// import { getShopById } from "controllers/shop.controller";
exports.shopRoute = express_1.default.Router();
exports.shopRoute.get("/", (req, res) => {
    (0, shop_controller_1.getAllShops)(req, res);
});
exports.shopRoute.get("/:id", (req, res) => {
    (0, shop_controller_1.getShopById)(req, res);
});
exports.shopRoute.post("/", (req, res) => {
    (0, shop_controller_1.createShop)(req, res);
});
exports.shopRoute.delete("/:id", (req, res) => {
    (0, shop_controller_1.deleteShop)(req, res);
});
// shopRoute.put("/:id", (req:RequestType, res:Response)=>{
//     // updateShop(req, res);
// });
//# sourceMappingURL=shop.route.js.map