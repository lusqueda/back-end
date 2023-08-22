import { ErrorEnum } from "../enum.dictionary.js"

export const errorMiddleware = (error, req, res, next) => {
    console.log(error.cause);
    switch(error.code){
        case ErrorEnum.INVALID_TYPES_ERROR:
            res.send({ status: "error", error: error.name })
            break;
        default:
            res.send({ status: "error", message: "error no manejado"})    
    }
}