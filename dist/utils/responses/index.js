"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleResponse = exports.ServerResponse = void 0;
const chalk_1 = __importDefault(require("chalk"));
let ServerResponse = () => {
    const success = (req, res, message, status = 200) => {
        let statusCode = status || 200;
        let statusMessage = message || '';
        res.status(statusCode).send({
            error: false,
            status: statusCode,
            body: statusMessage,
        });
    };
    const error = (req, res, message, status) => {
        let statusCode = status || 500;
        let statusMessage = message || 'Internal server error';
        res.status(statusCode).send({
            error: false,
            status: status,
            body: message,
        });
    };
    return {
        error,
        success,
    };
};
exports.ServerResponse = ServerResponse;
let ConsoleResponse = () => {
    const success = (procedence, message) => {
        console.warn(`${chalk_1.default.red(`[Handle Fatal Error >>> (${procedence})] ===> \n`)}, ${message}`);
    };
    const error = (procedence, message) => {
        console.warn(`${chalk_1.default.greenBright(`[Success Response >>> (${procedence})] ===> \n`)}, ${message}`);
    };
    return {
        error,
        success,
    };
};
exports.ConsoleResponse = ConsoleResponse;
//# sourceMappingURL=index.js.map