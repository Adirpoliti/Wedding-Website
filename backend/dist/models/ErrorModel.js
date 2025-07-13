"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.RequestTimeoutError = exports.MethodNotAllowedError = exports.RouteNotFoundError = exports.ResourceNotFoundError = exports.AccessRightsError = exports.PaymentRequiredError = exports.ValidationError = exports.UnauthorizedError = void 0;
const UnauthorizedError = (msg) => {
    const errorObj = { message: msg, status: 401 };
    throw errorObj;
};
exports.UnauthorizedError = UnauthorizedError;
const ValidationError = (msg) => {
    const errorObj = { message: msg, status: 400 };
    throw errorObj;
};
exports.ValidationError = ValidationError;
const PaymentRequiredError = (msg) => {
    const errorObj = { message: msg, status: 402 };
    throw errorObj;
};
exports.PaymentRequiredError = PaymentRequiredError;
const AccessRightsError = (msg) => {
    const errorObj = { message: msg, status: 403 };
    throw errorObj;
};
exports.AccessRightsError = AccessRightsError;
const ResourceNotFoundError = (id) => {
    const errorObj = { message: `id ${id} is not exist`, status: 404 };
    throw errorObj;
};
exports.ResourceNotFoundError = ResourceNotFoundError;
const RouteNotFoundError = (route) => {
    const errorObj = { message: `Route ${route} is not exist`, status: 404 };
    throw errorObj;
};
exports.RouteNotFoundError = RouteNotFoundError;
const MethodNotAllowedError = (id) => {
    const errorObj = { message: `user ${id} is not allowed`, status: 405 };
    throw errorObj;
};
exports.MethodNotAllowedError = MethodNotAllowedError;
const RequestTimeoutError = (msg) => {
    const errorObj = { message: 'Request Timeout', status: 408 };
    throw errorObj;
};
exports.RequestTimeoutError = RequestTimeoutError;
const ConflictError = (msg) => {
    const errorObj = { message: `${msg} `, status: 409 };
    throw errorObj;
};
exports.ConflictError = ConflictError;
