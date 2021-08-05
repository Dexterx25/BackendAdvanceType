import bcrypt from "bcrypt"
import chalk  from "chalk"
import controllerAuth from "../auth/index"

import {ServerResponse, ConsoleResponse} from "../../../utils/responses/index"

export default function (injectedStore:any, injectedCache:any) {
    let cache = injectedCache
    let store = injectedStore 
    
    if(!store ){
          store = require('../../../store/dummy') 
    }
    if(!cache ){
        cache = require('../../../store/dummy') 
    }

  let table = 'users'
  let procedence = '[USER CONTROLLER]'

    async function createUser({datas, type}:any) {
      return new Promise(async(resolve, reject)=>{
        if(!datas.first_name || !datas.last_name || !datas.email || !datas.password){

          reject('Incorrect dates, fill all fields!!!')
      return false;
     }

     const body: object = {
      data:{first_name:datas.first_name,
      last_name:datas.last_name ? datas.last_name : null,
      phone_number:datas.phone_number ? datas.phone_number : null,
      email:datas.email,
      dateBirthday:datas.dateBirthday ? datas.dateBirthday : null,
      full_name:`${datas.first_name}`+ " " + `${datas.last_name}`,
      provider:'gmail', 
      },
    type:type
   }
const registerRespon = await store.upsert(table, body)

const responAuth = await controllerAuth.upsert(registerRespon,{
encrypted_password:await bcrypt.hash(datas.password, 5),
id:registerRespon.id,
email:registerRespon.email 
})
console.log(registerRespon, responAuth)

const {email} = Object.assign(registerRespon, responAuth)
console.log('email controller Auth-->', email)

const response = await controllerAuth.insert(email, datas.password)

resolve(response)
})

     

      })
    }

    return{
        createUser
    }
}