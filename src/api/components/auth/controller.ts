import {nanoid} from 'nanoid'
import bcrypt from 'bcrypt'
import * as auth from '../../../authorizations/index'
import chalk from 'chalk'

export default function (injectedStore:any){
let store = injectedStore

if(!store){
    store = require('../../../store/store')
}
let table2 = 'authentications_users'
let table = 'users'
let procedence = '[CONTROLLER AUTH]'

insert: async(email:string, password:string) =>{
console.log(chalk.redBright('start InsertLogin'), email, password)
 const data = await store.query(table2, {email:email}, new Array(table))

 return   bcrypt.compare(password, data.encrypted_password)

 .then(async areEqual =>{
    if(areEqual === true){
        console.log(chalk.redBright('Password and Encripted password are equeal!'))
          const token = await auth.sign(data)
          console.log(`${procedence} ====> insertLogin - ${chalk.blueBright(data)}`)
          return  {token:token}
        }else{
         return 'Invalid Password'
         }
      }) 
     .catch((e:any)=>{
      })
}
//user auth
upsert: async(respon:any, data:any) =>{
    console.log('DATAS UPSERT ---->', data)
   const authData = {
          data:{
            user_id:respon.id,
            encrypted_password: data.encrypted_password, 
            email:data.email
          },     
          type:'insert_auth'
      }
      console.log(`${procedence} ====> upsertAuth authData body -> ${chalk.blueBright(data)}`)
      return  store.upsert(table2, authData)
}


}