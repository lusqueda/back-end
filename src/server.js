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
import routerUsers from "./routes/users.router.js";
import routerMocking from "./routes/mocking.router.js";
import routerLogger from "./routes/logger.router.js";
import routerIndex from "./routes/index.router.js";
import routerTickets from "./routes/tickets.router.js";

import ProductManager from "./daos/mongodb/ProductManager.js";
import {Server} from 'socket.io';

import passport from "passport";
import cookieParser from "cookie-parser";
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import initializePassport  from "./config/passport.config.js";
import { initializePassportJWT } from "./config/jwt.config.js";
import { errorMiddleware } from "./services/error/middleware/error.middleware.js";
import { addLogger } from "./utils/logger.js";

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

const swaggerOptions = {
    definition: {
       openapi: '3.0.1',
       info: {
        title: 'Documentacion API',
        description: 'e-Commerce'
       }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJsdoc(swaggerOptions)
app.use('/apidocs',swaggerUiExpress.serve,  swaggerUiExpress.setup(specs))

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

app.use(errorMiddleware);
app.use(addLogger);
app.use('/', routerIndex);
app.use('/views',routerViews);
app.use('/products', routerProducts)
app.use('/tickets', routerTickets)
app.use('/carts', routerCarts)
app.use('/api/session', routerSession)
app.use('/api/users', routerUsers)
app.use('/mock', routerMocking)
app.use('/loggertest', routerLogger)

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
