import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashsync } from "bcrypt";

export const signUp = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (user) {
        res.status(400).send('User already exists');
    }

    user = await prismaClient.user.create({
        data: {
            email, password, name
        }
    });
    res.json({
        data: user, message: 'User created successfully', success: true, status: 201
    });
}

export const login = (req: Request, res: Response) => {
    res.send('Login route');
}

export const register = (req: Request, res: Response) => {
    res.send('Register route');
}