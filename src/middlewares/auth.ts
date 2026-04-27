import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { UnAuthorizedException } from "../exceptions/exception-Handler";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../../secrets";
import { prismaClient } from "..";

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {

    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
        next(new UnAuthorizedException(ErrorCode.UNAUTHORIZED, "Unauthorized: No token provided", "A token is required to access this resource"));
        return;
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET!) as any;
        const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });

        if (!user) {
            next(new UnAuthorizedException(ErrorCode.UNAUTHORIZED, "Unauthorized: User not found", "No user found for the provided token"));
            return;
        }

        request.user = user;
        next();
    } catch (error) {
        next(new UnAuthorizedException(ErrorCode.UNAUTHORIZED, "Unauthorized: Invalid token", "The provided token is invalid"));
    }
}