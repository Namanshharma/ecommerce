import { Router } from "express";
import { login, register, signUp } from "../controllers/auth";
import { errorHandler } from "../error-handler";

const authRouter: Router = Router();

authRouter.post('/signup', errorHandler(signUp));
authRouter.post('/login', errorHandler(login));
authRouter.post('/register', errorHandler(register));

export default authRouter;