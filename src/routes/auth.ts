import { Router } from "express";
import { login, register, signUp } from "../controllers/auth";

const authRouter: Router = Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', login);
authRouter.post('/register', register);

export default authRouter;