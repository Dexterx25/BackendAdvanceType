import {config} from '../configurations/index'
import {CustomRespon} from '../utils/responses'
import {Request, Response} from 'express'
import jwt from 'jsonwebtoken';
import {decode} from 'jsonwebtoken'

const SECRET = config.jwt.secret;

function sign(data:any){
 return   jwt.sign(data, SECRET)
}

function verify (token:any){
  return jwt.verify(token, SECRET)
}

const cheak : any = {
    own: function(req:any, owner:any){
     const decoded : any = decodeHeader(req);

    //VERIFY IF IS OWNER:
    if (decoded.id !== owner) {
        throw CustomRespon.error('You can`t do this', 400)
    }
 },

    logged: function(req:any, owner:any){
        try {
            const decoded = decodeHeader(req);
            return true            
        } catch (error) {
            return error
        }
    }
}

function getToken(auth:any){ 
    if(!auth){
        throw  err('Don`t bring Token', 401)
    }

    if(auth.indexOf("Bearer ") === -1){
        throw err('formato invalido', 401)
    }

    let token = auth.replace("Bearer ", "");

    return token

}

function decodeHeader(req:any){
    const {headers, token} = req
    const authorization = !headers ? token : headers.authorization || '';
    const thetoken = getToken(authorization)
    const decoded = verify(thetoken)

    req.user = decoded

 return decoded;
}
export {
    sign, 
    cheak,
    decodeHeader
}
