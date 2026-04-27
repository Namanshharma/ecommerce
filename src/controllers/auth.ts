import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../secrets";
import { ErrorCode } from "../exceptions/root";
import { LoginSchema, SignUpSchema } from "../schema/users";
import { BadRequestException, UnProcessableEntityException } from "../exceptions/exception-Handler";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        SignUpSchema.parse(req.body);
        const { email, password, name } = req.body;
        let user = await prismaClient.user.findFirst({ where: { email } });
        if (user) {
            new BadRequestException("User already exists", ErrorCode.USER_ALREADY_EXISTS, "A user with the provided email already exists");
            return;
        }
        user = await prismaClient.user.create({
            data: {
                email, password: hashSync(password, 10), name
            }
        });
        res.status(201).json({
            data: {
                Id: user.id, Email: user.email, Name: user.name
            }, Message: 'User created successfully', Success: true
        });
    } catch (error: any) {
        new UnProcessableEntityException(ErrorCode.VALIDATION_ERROR, "Invalid input data", error?.issues);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        LoginSchema.parse(req.body);
        const { email, password } = req.body;
        let user = await prismaClient.user.findFirst({ where: { email } });
        if (!user) {
            new BadRequestException("User does not exist", ErrorCode.USER_NOT_FOUND, "No user found with the provided email");
            return;
        }
        if (!compareSync(password, user!.password)) {
            new BadRequestException("Invalid password", ErrorCode.INVALID_CREDENTIALS, "The provided password is incorrect");
            return;
        }
        const token = jwt.sign({ id: user!.id, email: user!.email }, JWT_SECRET!);
        res.status(200).json({
            data: {
                Name: user?.name, Email: user?.email
            }, Token: token, Message: 'Login successful', Success: true
        });
    } catch (error: any) {
        new UnProcessableEntityException(ErrorCode.VALIDATION_ERROR, "Invalid input data", error?.issues);
    }
}

export const me = (req: Request, res: Response, next: NextFunction) => {
    res.send('Register route');
}