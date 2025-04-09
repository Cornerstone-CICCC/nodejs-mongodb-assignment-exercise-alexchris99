import { Router } from "express";
import productController from "../controllers/product.controller";

// create a new router instance
const productRouter = Router()

// get all products
productRouter.get("/",productController.getAllProducts)

// add a product
productRouter.post("/",productController.addProduct)

// get product by id
productRouter.get("/:id", productController.getProductById)

// update product
productRouter.put("/:id", productController.updateProductById)

// delete product
productRouter.delete("/:id",productController.deleteProductById)



export default productRouter