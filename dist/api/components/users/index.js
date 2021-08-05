"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const { config } = require('../../../configurations/index');
let store, cache;
if (config.remoteDB === true) {
    store = require('../../../store/remote-postgres');
    cache = require('../../../store/remote-cache');
}
else {
    store = require('../../../store/postgres');
    cache = require('../../../store/redis');
}
exports.controller = require('./controller')(store, cache);
//# sourceMappingURL=index.js.map