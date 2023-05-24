import  express  from "express";
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";

const app = express()

app.use(express.json())

app.use('/api/products/', routerProducts)
app.use('/api/carts/', routerCarts)

/*app.get('/productos', async(req, res)=>{
    const products = await productManager.getProducts(req.query.limit)
    res.send(products)
})

app.get('/productos/:id', async(req, res)=>{
    const product = await productManager.getProductById(req.params.id)
    product === [] ? product = ['Producto no encontrado'] : null 
    res.send(product)
})*/

app.listen(8080, ()=>{console.log('Servidor Online')})