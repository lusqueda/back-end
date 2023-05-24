import  express  from "express";
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";

const app = express()

app.use(express.json())

app.use('/api/products/', routerProducts)
app.use('/api/carts/', routerCarts)

app.listen(8080, ()=>{console.log('Servidor Online')})