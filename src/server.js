import express from "express";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import envConfig from "./config/env.config.js";

import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import routerViews from "./routes/views.router.js"
import routerSession from "./routes/session.router.js";

import ProductManager from "./daos/mongodb/ProductManager.js";
import {Server} from 'socket.io';

import passport from "passport";
import cookieParser from "cookie-parser";
import  initializePassport  from "./config/passport.config.js";
import { initializePassportJWT } from "./config/jwt.config.js";


const app = express()

const connection = mongoose.connect(envConfig.mongoUrl);

const httpServer = app.listen(envConfig.port, ()=>{console.log('Servidor Online')});
const socketServer = new Server(httpServer);
const productManager = new ProductManager();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

app.use(cookieParser());
initializePassport();
initializePassportJWT();
app.use(passport.initialize());

/*app.use(
    session({
      store: new MongoStore({
        mongoUrl:
          "mongodb+srv://CoderUser:CoderPassword@codercluster.z7uinu4.mongodb.net/?retryWrites=true&w=majority",
      }),
      secret: "mongoSecret",
      resave: true,
      saveUninitialized: false,
    })
  );*/

app.use('/',routerViews);
app.use('/products', routerProducts)
app.use('/carts', routerCarts)
app.use('/api/session', routerSession)

const product = {}
socketServer.on('connection', socket => {
    console.log("Nuevo usuario conectado " + socket.id )

    socket.on('createForm', async (data)=>{
        Object.entries(data).forEach(([key, value]) => {
            product[value[0]] = `${value[1]}`;
        });
        const productId = await productManager.addProduct(product);
        product.id = productId
        socketServer.emit('newProduct', product)
    })

    socket.on('deleteForm', async (data)=>{
        Object.entries(data).forEach(([key, value]) => {
            product[value[0]] = `${value[1]}`;
        });      
        const productId = await productManager.deleteProduct(product.code);
        socketServer.emit('deleteProduct', product.code)
    })   

})
