const { Pool } = require('pg') 
import {ServerResponse, ConsoleResponse} from "../utils/responses/index"

const {config} = require('../configurations/index');


const pool =  new Pool(config.DBconfigPSQL);

const connection = 'xd'

module.exports =
         { pool,
           connection
         }
