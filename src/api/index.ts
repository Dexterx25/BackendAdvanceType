import express,{Application}from 'express';
let {config} = require('../configurations/index')
const app: Application = express();
require('dotenv').config()
import user from './components/users/network'

app.use('/api/user', user)




app.listen(3000, () =>{
    console.log(`Api Runing into ${config.api.host}:${config.api.port}`);
})