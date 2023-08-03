import dotenv from 'dotenv';

dotenv.config();

export default {
    port:process.env.PORT,
    ghId:process.env.GH_ID,
    ghSecret:process.env.GH_SECRET,
    mongoUrl:process.env.MONGO_URL,
    jwtKey:process.env.JWT_KEY,
    cookieKey:process.env.COOKIE_KEY,
}