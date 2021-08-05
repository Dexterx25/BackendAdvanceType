"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require('pg');
const { config } = require('../configurations/index');
const pool = new Pool(config.DBconfigPSQL);
const connection = 'xd';
module.exports =
    { pool,
        connection
    };
//# sourceMappingURL=db.js.map