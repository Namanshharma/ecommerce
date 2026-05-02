import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { DeleteProductSchema, getProductByIdSchema, ProductSchema } from "../schema/products";
import { InternalException, NotFoundException } from "../exceptions/exception-Handler";
import { ErrorCode } from "../exceptions/root";

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

export const updateProduct = async (request: Request, response: Response, next: NextFunction) => {

}

export const deleteProduct = async (request: Request, response: Response, next: NextFunction) => {
    DeleteProductSchema.parse(request.body);
    const { id } = request.body;
    const product = await prismaClient.product.findFirst({ where: { id } });
    if (!product) {
        next(new NotFoundException(ErrorCode.BAD_REQUEST, `Product with id ${id} not found`, `Product not found`));
        return;
    }
    await prismaClient.product.update({ where: { id }, data: { isActive: false } });

    response.status(200).json({
        message: "Product deleted successfully",
        Success: true
    });
}

export const getAllProducts = async (request: Request, response: Response, next: NextFunction) => {
    const products = await prismaClient.product.findMany({ where: { isActive: true } });

    response.status(200).json({
        message: "Products retrieved successfully",
        Data: products,
        Success: true
    });
}

export const getProductById = async (request: Request, response: Response, next: NextFunction) => {
    getProductByIdSchema.parse(request.body);
    const { id } = request.body;
    const product = await prismaClient.product.findUnique({ where: { id: Number(id) } });

    if (!product) {
        next(new NotFoundException(ErrorCode.BAD_REQUEST, `Product with id ${id} not found`, `Product not found`));
        return;
    }

    response.status(200).json({
        message: "Product retrieved successfully",
        Data: product,
        Success: true
    });
}