import { cartModel } from "../../daos/mongodb/models/carts.model.js";

export const CheckCartOwner = (req, res, next) =>{
    (req.user.user.cart === req.params.cid) ? next() :
        res.send({error: `Solo el propietario del carrito puede agregar productos.`});
}

export const verifyCartId = async (req, res, next) => {
    const cart = req.params.cid;
    let result = await cartModel.findOne({_id: cart});
    (result !== null) ? next() : res.send('No existe el carrito');
}
