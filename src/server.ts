import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
import productRouter from './Routes/product.routes';

// Create server
const app = express();

// Middleware
app.use(express.json());


//Routes
app.use("/products",productRouter)

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 3000;
const MongoDB = process.env.MONGO_DB!
mongoose
  .connect(MongoDB,{dbName: "store"})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));