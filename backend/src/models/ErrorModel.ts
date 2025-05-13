export type ErrorType = {
    message: string;
    status: number;
}

export const UnauthorizedError = (msg: string) => {
    const errorObj: ErrorType = { message: msg, status: 401 }
    throw errorObj;
}

export const ValidationError = (msg: string) => {
    const errorObj: ErrorType = { message: msg, status: 400 }
    throw errorObj;
}

export const PaymentRequiredError = (msg: string) => {
    const errorObj: ErrorType = { message: msg, status: 402 }
    throw errorObj;
}

export const AccessRightsError = (msg: string) => {
    const errorObj: ErrorType = { message: msg, status: 403 }
    throw errorObj;
}

export const ResourceNotFoundError = (id: string) => {
    const errorObj: ErrorType = { message: `id ${id} is not exist`, status: 404 }
    throw errorObj;
}

export const RouteNotFoundError = (route: string) => {
    const errorObj: ErrorType = { message: `Route ${route} is not exist`, status: 404 }
    throw errorObj;
}

export const MethodNotAllowedError = (id: string) => {
    const errorObj: ErrorType = { message: `user ${id} is not allowed`, status: 405 }
    throw errorObj;
}

export const RequestTimeoutError = (msg: string) => {
    const errorObj: ErrorType = { message: 'Request Timeout', status: 408 }
    throw errorObj;
}

export const ConflictError = (msg: string) => {
    const errorObj: ErrorType = { message: `${msg} `, status: 409 }
    throw errorObj;
}