import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/exception-Handler";

export const errorHandler = (method: Function) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            await method(request, response, next);
        } catch (error: any) {
            let exception: HttpException;
            if (error instanceof HttpException) {
                exception = error;
            } else {
                exception = new InternalException(ErrorCode.INTERNAL_SERVER_ERROR, error.message || "An unexpected error occurred", "Something went wrong on the server");
            }
            next(exception);
        }
    }
}