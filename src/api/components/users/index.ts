const {config} = require('../../../configurations/index');

let store : any, cache: any; 

if (config.remoteDB === true){
    store = require('../../../store/remote-postgres');
    cache = require('../../../store/remote-cache');
}else {
    store = require('../../../store/postgres');
    cache = require('../../../store/redis');
}

export const controller = require('./controller')(store, cache);

