import winston from "winston";
import envConfig from "../config/env.config.js";

const customLevels = {
   levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    }    
  };

const devLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({ level: "debug", format: winston.format.simple() })
    ],
})

const prodLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({ level: "info", format: winston.format.simple()}),
        new winston.transports.File({ filename: "./errors.log", level: "error", format: winston.format.simple()})
    ],
})

export const addLogger = (req, res, next) => {
    req.logger = envConfig.enviroment == 'production' ? prodLogger : devLogger ;
    next();
}