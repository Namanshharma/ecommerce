import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync } from "bcrypt";

export const signUp = async (req: Request, res: Response) => {

    try {
        debugger;
        
        const { email, password, name } = req.body;
        
        console.log("trying to find the user with existing email")
        
        let user = await prismaClient.user.findFirst({ where: { email } });
        
        if (user) {
            res.status(400).send('User already exists');
        }
        
        console.log("User not found so creating a new user");
        
        // user = await prismaClient.user.create({
        //     data: {
        //         email, password: hashSync(password, 10), name
        //     }
        // });

        console.log(`${user} is created successfully`);

        res.json({
            data: user, message: 'User created successfully', success: true, status: 201
        });

    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}

export const login = (req: Request, res: Response) => {
    res.send('Login route');
}

export const register = (req: Request, res: Response) => {
    res.send('Register route');
}