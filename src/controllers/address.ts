import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { addAddressSchema } from "../schema/address";
import { NotFoundException } from "../exceptions/exception-Handler";
import { ErrorCode } from "../exceptions/root";
import { User } from "../generated/prisma/client";

export const addAddress = async (request: Request, response: Response, next: NextFunction) => {
    addAddressSchema.parse(request.body);
    let address;
    let userInfo: User;
    try {
        userInfo = await prismaClient.user.findFirstOrThrow({ where: { id: request.body.userId } })
        address = await prismaClient.address.create({
            data: {
                ...request.body, userId: userInfo.id
            }
        });
    } catch (error: any) {
        next(new NotFoundException(ErrorCode.USER_NOT_FOUND, "User Not Found", error.Message || "Something went wrong"));
    }
    response.status(201).json({
        Success: true, Message: "Address Created Successfully",
        Data: address
    });
}

export const deleteAddress = async (request: Request, response: Response, next: NextFunction) => {
}

export const listAllAddresses = async (request: Request, response: Response, next: NextFunction) => {
}