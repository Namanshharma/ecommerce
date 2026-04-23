import { Router } from "express";
import { login, register } from "../controllers/auth";

const authRouter: Router = Router();

authRouter.post('/signup', signUp);
authRouter.get('/login', login);
authRouter.post('/register', register);

export default authRouter;