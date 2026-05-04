import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { DeleteProductSchema, getProductByIdSchema, ProductSchema } from "../schema/products";
import { NotFoundException } from "../exceptions/exception-Handler";
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
        Message: "Product created successfully",
        Data: product,
        Success: true
    });
}

export const updateProduct = async (request: Request, response: Response, next: NextFunction) => {
    const product = request.body;
    if (product.tags) {
        product.tags = request.body.tags.join(",");
    }
    const updateProduct = await prismaClient.product.update({ where: { id: product.id }, data: { tags: product.tags }, select: { id: true, name: true, description: true, price: true, tags: true } })
    response.status(201).json({
        Success: true,
        Message: "Product updated successfully",
        Data: updateProduct
    });
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
        Message: "Product deleted successfully",
        Success: true
    });
}

export const getAllProducts = async (request: Request, response: Response, next: NextFunction) => {
    const products = await prismaClient.product.findMany({ where: { isActive: true }, select: { id: true, name: true, description: true, price: true, tags: true } });
    response.status(200).json({
        Message: "Products retrieved successfully",
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
        Message: "Product retrieved successfully",
        Data: product,
        Success: true
    });
}