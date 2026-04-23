import express, { Express } from 'express';
import { PORT } from '../secrets';
import rootRouter from './routes';
import { PrismaClient } from './generated/prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';

const app: Express = express()

app.use('/api', rootRouter);

const adapter = new PrismaMssql({
    connectionString: process.env.DATABASE_URL!,
});

export const prismaClient = new PrismaClient({
    log: ['query'],
    adapter,
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});