import express, { Express } from 'express';
import { DB_CONFIG, PORT } from '../secrets';
import rootRouter from './routes';
import { PrismaClient } from './generated/prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';
import { errorMiddleware } from './middlewares/errors';

const app: Express = express()
app.use(express.json());

console.log("DATABASE_URL exists?", !!process.env.DATABASE_URL);
console.log("DATABASE_URL value:", process.env.DATABASE_URL);
console.log(DB_CONFIG);

const adapter = new PrismaMssql(DB_CONFIG);
export const prismaClient = new PrismaClient({
    log: ['query'],
    adapter,
});

app.use('/api', rootRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
