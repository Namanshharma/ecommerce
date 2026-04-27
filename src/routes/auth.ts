import { Router } from "express";
import { login, me, signUp } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";

const authRouter: Router = Router();

authRouter.post('/signup', errorHandler(signUp));
authRouter.post('/login', errorHandler(login));
authRouter.post('/me', [authMiddleware], errorHandler(me));

export default authRouter;