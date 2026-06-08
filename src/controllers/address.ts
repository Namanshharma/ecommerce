import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { addAddressSchema } from "../schema/address";
import { NotFoundException } from "../exceptions/exception-Handler";
import { ErrorCode } from "../exceptions/root";
import { User } from "../generated/prisma/client";

export const addAddress = async (request: Request, response: Response, next: NextFunction) => {
    addAddressSchema.parse(request.body);
    let userInfo: User;
    try {
        userInfo = await prismaClient.user.findFirstOrThrow({ where: { id: request.body.userId, isActive: true } })
    } catch (error: any) {
        throw new NotFoundException(ErrorCode.USER_NOT_FOUND, "User Not Found", error.Message || "Something went wrong");
    }

    try {
        const address = await prismaClient.address.create({
            data: {
                ...request.body, userId: userInfo.id
            }
        });
        response.status(201).json({
            Success: true, Message: "Address Created Successfully",
            Data: address
        });
    } catch (error: any) {
        throw new NotFoundException(ErrorCode.INTERNAL_SERVER_ERROR, "Internal Server Error", error.Message || "Something went wrong");
    }
}

export const deleteAddress = async (request: Request, response: Response, next: NextFunction) => {
}

export const listAllAddresses = async (request: Request, response: Response, next: NextFunction) => {
}