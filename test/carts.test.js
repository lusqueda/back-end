import mongoose from "mongoose";
import CartController from "../src/controllers/carts.controller.js";
import envConfig from "../src/config/env.config.js";
import chai from "chai";

const connection = mongoose.connect(envConfig.mongoUrlTest);
const cartDao = new CartController()

const expect = chai.expect;

describe('Test cart DAO', ()=>{
    before(function(){
    })

    it('Prueba para obtener un arreglo de carritos', async () => {
        const result = await cartDao.getCartsController();
        expect(Array.isArray(result)).to.be.ok;
    }).timeout(10000)

    it('Prueba para crear un carrito', async () => {
        const result = await cartDao.addCartContoller();
        expect(result._id).to.be.ok;
    }).timeout(10000)

    // it('Prueba para actualizar datos de un producto', async () => {
    //     let id = "6511d794b031f39bbc8c8cde"
    //     let product = {
    //             price: "800"
    //         }
    //     const result = await productDao.updateProductController(id,product);
    //     assert.strictEqual(result.acknowledged,true);
    // }).timeout(10000)

})