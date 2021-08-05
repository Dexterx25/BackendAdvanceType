const {pool} = require('./db')
const chalk = require('chalk')
import {insertTionDatas, queryDatas, updateDatas, listDatas, getData} from "../utils/postgres/index"

let procedence: string = '[STORE - POSTGRES]'

export function list(table:string) {
    console.log('listing--->', table)
    return new Promise( (resolve, reject) => {
        pool.query(`SELECT * FROM ${table} `, (err:any, result:any) => {
            if (err) return reject(err);
            console.log('resut--->', result.rows)
            resolve(result.rows);
        })
    })
}

export function get({type, querys}:any,table:string) {
    return new Promise(async(resolve, reject) => {
        const {theQuery} = await getData(querys, type)
        console.log('TheQuery--->', theQuery, 'tableee--->', table)
        pool.query(`SELECT * FROM ${table} ${theQuery}`, (err:any, result:any) => {
            if(err){
                console.log('error Get--->',err.stack)
                reject(err)
              }else{
                console.log(chalk.redBright(`succefull ${type}!`),result.rows[0])
                resolve(result.rows[0]);
             }
        })
    })
}

export async function insert(table:string, {data, type}:any) {
    console.warn('datas to insert --->', data, type, table)
     return new Promise(async(resolve, reject) => {
          const {keys, values} = await insertTionDatas(data, type)
          console.log('keys-->', keys, 'values--->', values)
         pool.query(`INSERT INTO ${table}(${keys}) values(${values}) RETURNING *`, (err:any, result:any) => {
            if (err) {
                console.log('error Insert--->',err.stack)
              } else {
                console.log(chalk.redBright(`succefull ${type}!`),result.rows[0])
                resolve(result.rows[0]);
              }
         })
     })
}

export function update(table:string, {data, type}:any) {
    return new Promise(async(resolve, reject) => {
        const {keysAndValuesToUpdate, conditions} = await updateDatas(data, type)

        pool.query(`UPDATE ${table} SET ${keysAndValuesToUpdate} ${conditions} RETURNING *`, (err:any, result:any) => {
            if(err){
                console.log('error Update--->',err.stack)
                reject(err)
              }else{
                console.log(chalk.redBright(`succefull ${type}!`),result.rows[0])
                resolve(result.rows[0]);
             }
        })
    })
}

export function upsert(table:string, data:any) {
    console.warn('datas upsert--->', data)
    if (data && data.id) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
}

export async function query(table:string, typequery:any, joins:any) {
    console.log(chalk.redBright('comming to query--->'), table, typequery, joins)
      let joinQuery = '';
      let query = ''
       if (joins.length) {
        const {theJoinQuery, theQuery} = await queryDatas(table, typequery, joins)
        joinQuery = theJoinQuery
        query = theQuery
      }else{
        const {theQuery} = await queryDatas(table, typequery, null)
        query = theQuery
      }
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} ${joinQuery}  ${query}`, (err:any, res:any) => {
            if (err) return reject(err);
            console.log('xdd-->', res.rows[0])
            resolve(res.rows[0]);
        })
    })
}

