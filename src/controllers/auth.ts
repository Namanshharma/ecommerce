import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../secrets";
import { ErrorCode } from "../exceptions/root";
import { assignAdminRoleSchema, LoginSchema, SignUpSchema } from "../schema/users";
import { BadRequestException } from "../exceptions/exception-Handler";
import { Role } from "../types/Role";
import z from "zod";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
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
        Data: {
            Id: user.id, Email: user.email, Name: user.name, Role: user.role
        }, Message: 'User created successfully', Success: true
    });
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
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
        Data: {
            Name: user?.name, Email: user?.email, Role: user?.role
        }, Token: token, Message: 'Login successful', Success: true
    });
}

export const me = async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json({
        Data: {
            Id: request.user?.id, Name: request.user?.name, Email: request.user?.email, Role: request.user?.role
        }, Message: "User Details fetched successfully", Success: true
    });
}

export const assignAdminRole = async (request: Request, response: Response, next: NextFunction) => {
    assignAdminRoleSchema.parse(request.body);

    const { email, password } = request.body;
    const user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
        new BadRequestException("User does not exist", ErrorCode.USER_NOT_FOUND, "No user found with the provided email");
        return;
    }
    if (!compareSync(password, user.password)) {
        new BadRequestException("Invalid password", ErrorCode.INVALID_CREDENTIALS, "The provided password is incorrect");
        return;
    }
    await prismaClient.user.update({ where: { email }, data: { role: Role.ADMIN } });
    response.status(200).json({
        Message: "Admin role assigned successfully", Success: true
    });
}

export const deleteUser = async (request: Request, response: Response, next: NextFunction) => {
    const { email } = request.body;
    z.string().email("Invalid email address").parse(email);

    const user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
        new BadRequestException("User does not exist", ErrorCode.USER_NOT_FOUND, "No user found with the provided email");
        return;
    }
    await prismaClient.user.update({ where: { email }, data: { isActive: false } });

    response.status(200).json({
        Message: "User deleted successfully", Success: true
    });
}