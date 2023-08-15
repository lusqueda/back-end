import { productsModel } from "../../daos/mongodb/models/products.model.js";

export const verifyProductId = async (req, res, next) => {
    const product = req.params.pid;
    let result = await productsModel.findOne({_id: product});
    (result !== null) ? next() : res.send('No existe el producto');
}

export const verifyProductBodyId = async (req, res, next) => {
    const product = req.body.product;
    let result = await productsModel.findOne({_id: product});
    (result !== null) ? next() : res.send('No existe el producto');
}