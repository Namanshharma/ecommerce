import { z } from 'zod';

export const ProductSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Product description is required'),
    price: z.number().positive('Price must be a positive number'),
    tags: z.array(z.string()).optional()
})

export const DeleteProductSchema = z.object({
    id: z.number().positive().min(1, 'Product ID is required')
})

export const getProductByIdSchema = z.object({
    id: z.number().positive().min(1, 'Product ID is required').max(5000, 'Product ID must be less than 500')
})