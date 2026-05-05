import { Router } from "express";
import authRouter from "./auth";
import productsRouter from "./productsRouter";
import { addressRouter } from "./addressRouter";

const rootRouter: Router = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/products', productsRouter);
rootRouter.use('/address', addressRouter);


export default rootRouter;