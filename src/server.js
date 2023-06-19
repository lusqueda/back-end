import  express  from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";

import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import routerViews from "./routes/views.router.js"

import ProductManager from "./daos/mongodb/ProductManager.js";
import {Server} from 'socket.io';

const app = express()
const httpServer = app.listen(8080, ()=>{console.log('Servidor Online')});
const socketServer = new Server(httpServer);
const productManager = new ProductManager();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.json())

app.use(express.static(__dirname+'/public'));
app.use('/',routerViews);
app.use('/products', routerProducts)
app.use('/carts', routerCarts)


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
