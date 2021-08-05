"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let { config } = require('../configurations/index');
const app = express_1.default();
require('dotenv').config();
const network_1 = __importDefault(require("./components/users/network"));
app.use('/api/user', network_1.default);
app.listen(3000, () => {
    console.log(`Api Runing into ${config.api.host}:${config.api.port}`);
});
//# sourceMappingURL=index.js.map