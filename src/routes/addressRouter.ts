import { Router } from "express";
import { errorHandler } from "../error-handler";
import { addAddress, deleteAddress, listAllAddresses } from "../controllers/address";
import { adminMiddleware, authMiddleware } from "../middlewares/auth";

export const addressRouter: Router = Router();

addressRouter.post("/addAddress", errorHandler(addAddress));
addressRouter.delete("/deleteAddress/:id", [authMiddleware, adminMiddleware], errorHandler(deleteAddress));
addressRouter.get("/listAllAddresses", errorHandler(listAllAddresses));