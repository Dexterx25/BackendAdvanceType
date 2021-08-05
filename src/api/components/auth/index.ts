import {config} from "../../../configurations/index"
import * as store  from "../../../store/postgres"

const controller = require('./controller')(store);