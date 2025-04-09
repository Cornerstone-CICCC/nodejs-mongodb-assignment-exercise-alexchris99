"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
// create a new router instance
const productRouter = (0, express_1.Router)();
// get all products
productRouter.get("/", product_controller_1.default.getAllProducts);
// add a product
productRouter.post("/", product_controller_1.default.addProduct);
// get product by id
productRouter.get("/:id", product_controller_1.default.getProductById);
// update product
productRouter.put("/:id", product_controller_1.default.updateProductById);
// delete product
productRouter.delete("/:id", product_controller_1.default.deleteProductById);
exports.default = productRouter;
