import dotenv from 'dotenv';

dotenv.config();

export default {
    port:process.env.PORT,
    ghId:process.env.GH_ID,
    ghSecret:process.env.GH_SECRET,
    mongoUrl:process.env.MONGO_URL,
    mongoUrlTest:process.env.MONGO_URL_TEST,
    jwtKey:process.env.JWT_KEY,
    jwtKeyRP:process.env.JWT_KEYRP,
    cookieKey:process.env.COOKIE_KEY,
    enviroment:process.env.ENVIROMENT,
}