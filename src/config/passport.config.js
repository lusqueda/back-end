import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import { userModel } from "../daos/mongodb/models/users.model.js"
import { createHash, validatePassword } from "../utils.js";
import CartManager from "../daos/mongodb/CartManager.js";
import envConfig from "./env.config.js";

const cartManager = new CartManager()
const LocalStrategy = local.Strategy;
const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {passReqToCallback:true,usernameField:'email'}, async (req,username,password,done)=>{
            const {first_name,last_name,email,age,cart,role,last_connection} = req.body;
            try{
                let user = await userModel.findOne({email:username});
                if(user) {
                    console.log("El usuario ya existe")
                    return done(null,false);
                }
                let cartId = await cartManager.addCart();
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    cart: cartId._id,
                    role,
                    password: createHash(password),
                    last_connection
                }
                let result = await userModel.create(newUser);
                return done(null, result);
            }catch (error){
                return done("Error al obtener usuario: "+error)
            }
        }
    ))

    passport.use('login', new LocalStrategy({usernameField:'email'},async(username,password,done)=>{
        try{
            const user = await userModel.findOne({email:username})
            if(!user) {
                console.log("Usuario no existe")
                return done(null, false)
            }
            if(!validatePassword(password,user)) return done(null,false);
            return done(null,user);
        }catch(error){
            return done(error)
        }
    }))   

    passport.use(
        'github', 
        new GithubStrategy({
            clientID: envConfig.ghId, 
            clientSecret: envConfig.ghSecret, 
            callbackURL: 'http://localhost:8080/api/session/githubcallback',
        }, async (accessToke, refreshToken, profile, done) => {
            console.log(profile)
        let user = await userModel.findOne({ email: profile._json.email });
        if (!user) {

          let newUser = {
            first_name: profile.username,
            last_name: "test lastname",
            email: profile.profileUrl ,
            age: 25,
            password: "1234",
          };
          const result = await userModel.create(newUser);
          done(null, result);
        } else {
          done(null, false);
        }
        })
    );

    passport.serializeUser((user,done) => {
        done(null,user._id);
    });

    passport.deserializeUser( async (id,done) => {
        let user = await userModel.findById(id);
        done(null,user);
    });

}

export default initializePassport;
