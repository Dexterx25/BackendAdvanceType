import { Router, Request, Response, NextFunction} from "express";
import chakl from "chalk"

export let ServerResponse = {
      success: function (req:Request, res:Response, message:string, status:number = 200) {
        let statusCode = status || 200;
        let statusMessage = message || '';
    
        res.status(statusCode).send({
            error: false,
            status: statusCode,
            body: statusMessage,
        });
    },

     error: function(req:Request, res:Response, message:any, status:number) {
        let statusCode = status || 500;
        let statusMessage = message || 'Internal server error';

        res.status(statusCode).send({
            error: false,
            status: status,
            body: message,
        });
    }
}

export let ConsoleResponse = {
     success: function(procedence:string, message:any) {
         console.warn(`${chakl.red(`[Handle Fatal Error >>> (${procedence})] ===> \n`)}, ${message}`)
    },
     error : function(procedence:string, message:string){
         console.warn(`${chakl.greenBright(`[Success Response >>> (${procedence})] ===> \n`)}, ${message}`)
    }

}

export let CustomRespon :any ={
    error: function (err:any, req:Request, res:Response, next?:NextFunction) : any{
        const message = err.message || 'Error interno';
        const status = err.statusCode || 500;
        ServerResponse.error(req, res, message, status);
    }
}
