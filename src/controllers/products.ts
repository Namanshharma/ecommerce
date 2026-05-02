import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { ProductSchema } from "../schema/products";

export const createProduct = async (request: Request, response: Response, next: NextFunction) => {
    ProductSchema.parse(request.body);

    const product = await prismaClient.product.create({
        data: {
            ...request.body,
            tags: request.body.tags?.join(','),
        }
    });

    response.status(201).json({
        message: "Product created successfully",
        Data: product,
        Success: true
    });
}