import { productsModel } from "../../daos/mongodb/models/products.model.js";

export const verifyProductId = async (req, res, next) => {
    const product = req.params.pid;
    try {
        const result = await productsModel.findOne({_id: product});
        if(result !== null) { next() }
    } catch (error) {
        res.status(404).send({error: 'No existe el producto'})
    }
}

export const verifyProductBodyId = async (req, res, next) => {
    const product = req.body.product;
    try {
        const result = await productsModel.findOne({_id: product});
        if(result !== null) { next() }
    } catch (error) {
        res.status(404).send({error: 'No existe el producto'})
    }
}