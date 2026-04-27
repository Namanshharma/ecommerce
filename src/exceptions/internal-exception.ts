import { ErrorCode, HttpException } from "./root";

export class InternalException extends HttpException {
    constructor(errorCode: ErrorCode, actualError: string, errorMessage: string) {
        super(500, errorCode, actualError, errorMessage);
    }
}