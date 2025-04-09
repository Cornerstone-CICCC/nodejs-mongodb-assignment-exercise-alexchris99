import { Request, Response } from "express";
import { Product,IProduct } from "../Models/product.model";

// add a product
const addProduct = async (req: Request<{},{},IProduct>, res: Response)=>{
    try{
        const{productName, productPrice} = req.body
        if(!productName||!productPrice){
            res.status(404).json({message: "Missing informatoion"})
            return
        }
        const newProduct = await Product.create({
            productName,
            productPrice
        })
        if(!newProduct){
            res.status(404).json({message: "Unable to create product"})
            return
        }
        res.status(201).json(newProduct)
    }catch(err){
        console.error(err)
        res.status(500).json({message: "Unable to add product"})
    }
}

// Get all products
const getAllProducts = async (req: Request, res: Response)=>{
    try{
        const products = await Product.find()
        if(products.length === 0){
            res.status(200).json({message: "No products yet"})
            return
        }
        res.status(200).json(products)
    }catch(err){
        console.error(err)
        res.status(500).json({message: "Unable to fecth all products"})
    }
}

// Get product by id
const getProductById = async (req: Request<{id: string}>, res: Response)=>{
    try{
        const id = req.params.id
        if(!id){
            res.status(404).json({message: "Id is missing"})
            return
        }
        const product = await Product.findById(id)
        if(!product){
            res.status(404).json({message: "Unable to fetch product"})
            return
        }
        res.status(200).json(product)
    }catch(err){
        console.error(err)
        res.status(500).json({message: "Unable to fetch product"})
    }
}  

// update product
const updateProductById = async (req: Request<{id: string},{},Partial<IProduct>>, res: Response)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new: true // to get the data back
        })
        if(!updatedProduct){
            res.status(404).json({message: "Unable to update product"})
            return
        }
        res.status(200).json(updatedProduct)
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Unable to update product"})
    }
}

// delet prduct by id
const deleteProductById = async (req: Request<{id: string}>, res: Response)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            res.status(404).json({message: "Unable to delete product"})
        }
        res.status(200).json(product)
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Unable to delete product"})
    }
}

export default{
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
}