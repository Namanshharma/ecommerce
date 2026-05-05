import { Router } from "express";
import { errorHandler } from "../error-handler";
import { addAddress, deleteAddress, listAddress } from "../controllers/address";
import { adminMiddleware, authMiddleware } from "../middlewares/auth";

export const addressRouter: Router = Router();

addressRouter.post("/addAddress", [authMiddleware, adminMiddleware], errorHandler(addAddress));
addressRouter.post("/deleteAddress", [authMiddleware, adminMiddleware], errorHandler(deleteAddress));
addressRouter.post("/listAddress", errorHandler(listAddress));