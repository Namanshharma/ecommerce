import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/products";
import { errorHandler } from "../error-handler";
import { adminMiddleware, authMiddleware } from "../middlewares/auth";

const productsRouter: Router = Router();

productsRouter.post('/createProduct', [authMiddleware, adminMiddleware], errorHandler(createProduct));
productsRouter.post('/updateProduct', errorHandler(updateProduct));
productsRouter.post('/deleteProduct', [authMiddleware, adminMiddleware], errorHandler(deleteProduct));
productsRouter.post('/getProductById', [authMiddleware, adminMiddleware], errorHandler(getProductById));
productsRouter.post('/getAllProducts', [authMiddleware, adminMiddleware], errorHandler(getAllProducts));

export default productsRouter;