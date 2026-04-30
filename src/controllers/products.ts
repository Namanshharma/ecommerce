import { Request, Response } from "express";

export const createProduct = async (request: Request, response: Response) => {
    const { name, description, price, tags } = request.body;
}