import { ErrorCode, HttpException } from "./root";

export class BadRequestException extends HttpException {
    constructor(errorMessage: string, errorCode: ErrorCode, actualError: string) {
        super(400, errorCode, actualError, errorMessage);
    }
}