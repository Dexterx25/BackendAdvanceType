"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.upsert = exports.update = exports.insert = exports.get = exports.list = void 0;
const { pool } = require('./db');
const chalk = require('chalk');
const index_1 = require("../utils/postgres/index");
let procedence = '[STORE - POSTGRES]';
function list(table) {
    console.log('listing--->', table);
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} `, (err, result) => {
            if (err)
                return reject(err);
            console.log('resut--->', result.rows);
            resolve(result.rows);
        });
    });
}
exports.list = list;
function get({ type, querys }, table) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const { theQuery } = yield index_1.getData(querys, type);
        console.log('TheQuery--->', theQuery, 'tableee--->', table);
        pool.query(`SELECT * FROM ${table} ${theQuery}`, (err, result) => {
            if (err) {
                console.log('error Get--->', err.stack);
                reject(err);
            }
            else {
                console.log(chalk.redBright(`succefull ${type}!`), result.rows[0]);
                resolve(result.rows[0]);
            }
        });
    }));
}
exports.get = get;
function insert(table, { data, type }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.warn('datas to insert --->', data, type, table);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const { keys, values } = yield index_1.insertTionDatas(data, type);
            console.log('keys-->', keys, 'values--->', values);
            pool.query(`INSERT INTO ${table}(${keys}) values(${values}) RETURNING *`, (err, result) => {
                if (err) {
                    console.log('error Insert--->', err.stack);
                }
                else {
                    console.log(chalk.redBright(`succefull ${type}!`), result.rows[0]);
                    resolve(result.rows[0]);
                }
            });
        }));
    });
}
exports.insert = insert;
function update(table, { data, type }) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const { keysAndValuesToUpdate, conditions } = yield index_1.updateDatas(data, type);
        pool.query(`UPDATE ${table} SET ${keysAndValuesToUpdate} ${conditions} RETURNING *`, (err, result) => {
            if (err) {
                console.log('error Update--->', err.stack);
                reject(err);
            }
            else {
                console.log(chalk.redBright(`succefull ${type}!`), result.rows[0]);
                resolve(result.rows[0]);
            }
        });
    }));
}
exports.update = update;
function upsert(table, data) {
    console.warn('datas upsert--->', data);
    if (data && data.id) {
        return update(table, data);
    }
    else {
        return insert(table, data);
    }
}
exports.upsert = upsert;
function query(table, typequery, joins) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.redBright('comming to query--->'), table, typequery, joins);
        let joinQuery = '';
        let query = '';
        if (joins.length) {
            const { theJoinQuery, theQuery } = yield index_1.queryDatas(table, typequery, joins);
            joinQuery = theJoinQuery;
            query = theQuery;
        }
        else {
            const { theQuery } = yield index_1.queryDatas(table, typequery, null);
            query = theQuery;
        }
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM ${table} ${joinQuery}  ${query}`, (err, res) => {
                if (err)
                    return reject(err);
                console.log('xdd-->', res.rows[0]);
                resolve(res.rows[0]);
            });
        });
    });
}
exports.query = query;
//# sourceMappingURL=postgres.js.map