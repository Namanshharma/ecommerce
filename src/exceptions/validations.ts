import { ErrorCode, HttpException } from "./root";

export class UnProcessableEntityException extends HttpException {
    constructor(statusCode: number = 422, errorCode: ErrorCode, actualError: string, errorMessage: string) {
        super(statusCode, errorCode, actualError, errorMessage);
    }
}