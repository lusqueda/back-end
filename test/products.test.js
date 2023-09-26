import mongoose from "mongoose";
import ProductController from "../src/controllers/products.controller.js";
import envConfig from "../src/config/env.config.js";
import Asserts from "assert";

const connection = mongoose.connect(envConfig.mongoUrlTest);
const productDao = new ProductController()

const assert = Asserts.strict;

describe('Test product DAO', ()=>{
    before(function(){
    })

    it('Prueba para obtener un arreglo de productos', async () => {
        const result = await productDao.getAllProductsController();
        console.log(result)
        assert.strictEqual(typeof result,'object')
    }).timeout(10000)

    it('Prueba para crear un producto', async () => {
        let product = {
            title: "Sprite",
            description: "1000cc",
            category: "Bebidas",
            price: "400",
            stock: 200,
            owner: "l_usqueda@hotmail.com"
        }
        const result = await productDao.addProductContoller(product);
        assert.ok(result._id);
    }).timeout(10000)

    it('Prueba para actualizar datos de un producto', async () => {
        let id = "6511d794b031f39bbc8c8cde"
        let product = {
                price: "800"
            }
        const result = await productDao.updateProductController(id,product);
        assert.strictEqual(result.acknowledged,true);
    }).timeout(10000)

})