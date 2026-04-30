import { Router } from "express";
import { createProduct } from "../controllers/products";

const productsRouter: Router = Router();

productsRouter.post('/createProduct', createProduct);

export default productsRouter;