"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomRespon = exports.ConsoleResponse = exports.ServerResponse = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.ServerResponse = {
    success: function (req, res, message, status = 200) {
        let statusCode = status || 200;
        let statusMessage = message || '';
        res.status(statusCode).send({
            error: false,
            status: statusCode,
            body: statusMessage,
        });
    },
    error: function (req, res, message, status) {
        let statusCode = status || 500;
        let statusMessage = message || 'Internal server error';
        res.status(statusCode).send({
            error: false,
            status: status,
            body: message,
        });
    }
};
exports.ConsoleResponse = {
    success: function (procedence, message) {
        console.warn(`${chalk_1.default.red(`[Handle Fatal Error >>> (${procedence})] ===> \n`)}, ${message}`);
    },
    error: function (procedence, message) {
        console.warn(`${chalk_1.default.greenBright(`[Success Response >>> (${procedence})] ===> \n`)}, ${message}`);
    }
};
exports.CustomRespon = {
    error: function (err, req, res, next) {
        const message = err.message || 'Error interno';
        const status = err.statusCode || 500;
        exports.ServerResponse.error(req, res, message, status);
    }
};
//# sourceMappingURL=index.js.map