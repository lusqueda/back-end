import  express  from "express";
import ProductManager from "./clasess/ProductManager.js";

const app = express()

const productManager = new ProductManager()

app.get('/productos', async(req, res)=>{
    const products = await productManager.getProducts(req.query.limit)
    res.send(products)
})

app.get('/productos/:id', async(req, res)=>{
    const product = await productManager.getProductById(req.params.id)
    product === [] ? product = ['Producto no encontrado'] : null 
    res.send(product)
})

app.listen(8080, ()=>{console.log('Servidor Online')})