import { Router, Request, Response, NextFunction} from "express";
import chakl from "chalk"
export let ServerResponse = () =>{
    const success = (req:Request, res:Response, message:string, status:number = 200) =>{
        let statusCode = status || 200;
        let statusMessage = message || '';
    
        res.status(statusCode).send({
            error: false,
            status: statusCode,
            body: statusMessage,
        });
    }

    const error = (req:Request, res:Response, message:any, status:number) =>{
        let statusCode = status || 500;
        let statusMessage = message || 'Internal server error';

        res.status(statusCode).send({
            error: false,
            status: status,
            body: message,
        });
    }

    return{
        error,
        success,
    }
}


export let ConsoleResponse = () =>{
    const success = (procedence:string, message:any) =>{
         console.warn(`${chakl.red(`[Handle Fatal Error >>> (${procedence})] ===> \n`)}, ${message}`)
    }
    
    const error = (procedence:string, message:string) =>{
         console.warn(`${chakl.greenBright(`[Success Response >>> (${procedence})] ===> \n`)}, ${message}`)
    }

    return{
        error,
        success,
    }
}