import { User } from "../generated/prisma/client";

// declare module 'express' {
//     export interface Request {
//         user: User
//     }
// }

declare global {
    namespace Express {
        export interface Request {
            user: User
        }
    }
}