import { Router } from "express";
import authRouter from "./auth";
import productsRouter from "./productsRouter";

const rootRouter: Router = Router();

rootRouter.use('/auth', authRouter)
rootRouter.use('/products', productsRouter)


export default rootRouter;