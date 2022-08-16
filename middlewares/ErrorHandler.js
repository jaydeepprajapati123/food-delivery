import {ValidationError} from "joi";
import { CustomErrorHandler } from "../services";

const ErrorHandler = (err,req,res,next) => {
    let statusCode = 500;
    let data = {
        status: 0,
        msg: "Internal Server Error",
        msg2: err.message
    }
    console.log(err.message);

    if(err instanceof ValidationError){
        statusCode = 422,
        data = {
            status: 0,
            msg: err.message
        }
    }

    if(err instanceof CustomErrorHandler){
        statusCode = err.statusCode;
        data = {    
            status: err.status,
            msg:err.message
        }
    }


    return res.status(statusCode).json(data);
}

export default ErrorHandler;