import { Router } from "express";
import { login, register, signUp } from "../controllers/auth";

const authRouter: Router = Router();

authRouter.get('/login', login);
authRouter.post('/register', register);
authRouter.post('/signup', signUp);

export default authRouter;