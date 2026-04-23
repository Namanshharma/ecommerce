import express, { Express } from 'express';
import { DB_CONFIG, PORT } from '../secrets';
import rootRouter from './routes';
import { PrismaClient } from './generated/prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';

const app: Express = express()

app.use(express.json());
app.use('/api', rootRouter); 

console.log("DATABASE_URL exists?  ==> ", !!process.env.DATABASE_URL);
console.log("DATABASE_URL value:  ==> ", process.env.DATABASE_URL);
console.log("DB_CONFIG value:  ==> ", DB_CONFIG);

const adapter = new PrismaMssql({ DB_CONFIG });

export const prismaClient = new PrismaClient({
    log: ['query'],
    adapter,
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
