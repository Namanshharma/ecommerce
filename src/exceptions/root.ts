// some of the error details which we need to handle in the root exception class -- Error Message, HTTP Status Code, Error Code, Actuall error

export class HttpException extends Error {
    constructor(statusCode: number, errorCode: ErrorCode, actualError: string, errorMessage: string) {
        super(errorMessage);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.actualError = actualError;
        this.errorMessage = errorMessage;
    }

    errorMessage: string;
    statusCode: number;
    errorCode: ErrorCode;
    actualError: string;
}

export enum ErrorCode {
    USER_ALREADY_EXISTS = 1001,
    USER_NOT_FOUND = 1002,
    INVALID_CREDENTIALS = 1003,
    INTERNAL_SERVER_ERROR = 1004,
    BAD_REQUEST = 1005,
}