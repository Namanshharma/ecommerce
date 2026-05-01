import { Request, Response } from "express";
import { prismaClient } from "..";

export const createProduct = async (request: Request, response: Response) => {
    const { name, description, price, tags } = request.body;

    const product = await prismaClient.product.create({
        data: { name, description, price, tags }
    });

    response.status(201).json({
        message: "Product created successfully",
        Data: product
    });
}