import express, { Express } from 'express';
import { DB_CONFIG, PORT } from '../secrets';
import rootRouter from './routes';
import { PrismaClient } from './generated/prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';
import { errorMiddleware } from './middlewares/errors';
import { SignUpSchema } from './schema/users';

const app: Express = express()
app.use(express.json());

const adapter = new PrismaMssql(DB_CONFIG);     // this line tells prisma - How to connect to the DB by using the Confingurations provided in the secrets file. 
// It also tells prisma to use the MSSQL adapter for connecting to the database.

export const prismaClient = new PrismaClient({
    log: ['query'],     // This line enables logging of all database queries executed by the Prisma Client.
    adapter,            // This line tells the Prisma Client to use the MSSQL adapter for database operations.
})
// .$extends({           // Example of extending the Prisma Client with a custom method
//     query: {
//         user: {         // This block defines a custom query extension for the 'user' model in Prisma.
//             create({ args, query }) {
//                 console.log("Creating user with args:", args);
//                 args.data = SignUpSchema.parse(args.data);                  // Validate input data against the schema
//                 return query(args);
//             }
//         }
//     }
// });

app.use('/api', rootRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});