import { ErrorCode, HttpException } from "./root";

export class InternalException extends HttpException {
    constructor(errorCode: ErrorCode, actualError: string, errorMessage: string) {
        super(500, errorCode, actualError, errorMessage);
    }
}

export class BadRequestException extends HttpException {
    constructor(errorMessage: string, errorCode: ErrorCode, actualError: string) {
        super(400, errorCode, actualError, errorMessage);
    }
}

export class UnProcessableEntityException extends HttpException {
    constructor(errorCode: ErrorCode, actualError: string, errorMessage: string) {
        super(422, errorCode, actualError, errorMessage);
    }
}

export class UnAuthorizedException extends HttpException {
    constructor(errorCode: ErrorCode, actualError: string, errorMessage: string) {
        super(401, errorCode, actualError, errorMessage);
    }
}