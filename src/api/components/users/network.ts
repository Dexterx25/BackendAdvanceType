import { Router, Request, Response, NextFunction, response} from "express";
const controller = require('./index')
const {ServerResponse, ConsoleResponse} = require('../../../utils/responses/index')
const secure = require('./secure')
const router: Router = Router()
router.post('/register', upsert)
// router.post('/register/facebook', upsertFacebook)
// router.post('/register/ios', upsertIOS)
// router.get('/', secure('get'), get)
// router.get('/list',secure('list'), list)
// router.put('/update', secure('update'), upload.single('file'),  update)
// router.get('/filter', secure('filter'), filter)
let procedence : string = "USER NETWORK"

async function upsert(req: Request, res: Response, next: NextFunction ) {
const datas: object = {
    token:req.headers.authorization,
    datas:req.body,
    type:req.body.type
 }
 await controller.register(datas)
     .then((respon:any)=>{
        ConsoleResponse.success(procedence, respon)
        ServerResponse.success(req, res, respon, 200)
     })
     .catch((error:any)=>{
        ConsoleResponse.success(procedence, error)
        ServerResponse.success(req, res, error, 400)
     })
}

export default router