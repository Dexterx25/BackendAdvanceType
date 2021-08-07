"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeHeader = exports.cheak = exports.sign = void 0;
const index_1 = require("../configurations/index");
const responses_1 = require("../utils/responses");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = index_1.config.jwt.secret;
function sign(data) {
    return jsonwebtoken_1.default.sign(data, SECRET);
}
exports.sign = sign;
function verify(token) {
    return jsonwebtoken_1.default.verify(token, SECRET);
}
const cheak = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        //VERIFY IF IS OWNER:
        if (decoded.id !== owner) {
            throw responses_1.CustomRespon.error('You can`t do this', 400);
        }
    },
    logged: function (req, owner) {
        try {
            const decoded = decodeHeader(req);
            return true;
        }
        catch (error) {
            return error;
        }
    }
};
exports.cheak = cheak;
function getToken(auth) {
    if (!auth) {
        throw err('Don`t bring Token', 401);
    }
    if (auth.indexOf("Bearer ") === -1) {
        throw err('formato invalido', 401);
    }
    let token = auth.replace("Bearer ", "");
    return token;
}
function decodeHeader(req) {
    const { headers, token } = req;
    const authorization = !headers ? token : headers.authorization || '';
    const thetoken = getToken(authorization);
    const decoded = verify(thetoken);
    req.user = decoded;
    return decoded;
}
exports.decodeHeader = decodeHeader;
//# sourceMappingURL=index.js.map