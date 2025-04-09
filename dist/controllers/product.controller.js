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
const product_model_1 = require("../Models/product.model");
// add a product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, productPrice } = req.body;
        if (!productName || !productPrice) {
            res.status(404).json({ message: "Missing informatoion" });
            return;
        }
        const newProduct = yield product_model_1.Product.create({
            productName,
            productPrice
        });
        if (!newProduct) {
            res.status(404).json({ message: "Unable to create product" });
            return;
        }
        res.status(201).json(newProduct);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to add product" });
    }
});
// Get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.Product.find();
        if (products.length === 0) {
            res.status(200).json({ message: "No products yet" });
            return;
        }
        res.status(200).json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to fecth all products" });
    }
});
// Get product by id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(404).json({ message: "Id is missing" });
            return;
        }
        const product = yield product_model_1.Product.findById(id);
        if (!product) {
            res.status(404).json({ message: "Unable to fetch product" });
            return;
        }
        res.status(200).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to fetch product" });
    }
});
// update product
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true // to get the data back
        });
        if (!updatedProduct) {
            res.status(404).json({ message: "Unable to update product" });
            return;
        }
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to update product" });
    }
});
// delet prduct by id
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Unable to delete product" });
        }
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to delete product" });
    }
});
exports.default = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
};
