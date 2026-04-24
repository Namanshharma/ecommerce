import { Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../secrets";

export const signUp = async (req: Request, res: Response) => {

    try {
        const { email, password, name } = req.body;

        console.log("trying to find the user with existing email")

        let user = await prismaClient.user.findFirst({ where: { email } });

        if (user) {
            res.status(400).send('User already exists');
        }

        console.log("User not found so creating a new user");

        user = await prismaClient.user.create({
            data: {
                email, password: hashSync(password, 10), name
            }
        });

        console.log(`${user} is created successfully`);

        res.json({
            data: {
                id: user.id, email: user.email, name: user.name
            }, message: 'User created successfully', success: true, status: 201
        });

    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (!user) {
        res.status(400).send('User does not exist');
    }
    if (!compareSync(password, user!.password)) {
        res.status(400).send('Invalid password');
    }

    const token = jwt.sign({ id: user!.id, email: user!.email }, JWT_SECRET!);
    res.json({
        data: {
            Name: user?.name, Email: user?.email
        }, Token: token
    });
}

export const register = (req: Request, res: Response) => {
    res.send('Register route');
}