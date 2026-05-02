import { Router } from "express";
import { createProduct } from "../controllers/products";
import { errorHandler } from "../error-handler";
import { adminMiddleware, authMiddleware } from "../middlewares/auth";

const productsRouter: Router = Router();

productsRouter.post('/createProduct', [authMiddleware, adminMiddleware], errorHandler(createProduct));

export default productsRouter;