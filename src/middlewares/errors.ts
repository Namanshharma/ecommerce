import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

export const errorMiddleware = (httpException: HttpException, request: Request, response: Response, next: NextFunction) => {
    response.status(httpException.statusCode).json({
        Message: httpException.errorMessage,
        ErrorCode: httpException.errorCode,
        ActualError: httpException.actualError
    });
}