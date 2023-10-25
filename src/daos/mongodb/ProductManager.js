import { productsModel } from "./models/products.model.js";
import { cartModel } from "./models/carts.model.js";
import { userModel } from "./models/users.model.js";
import { generateProducts } from "../../utils.js";

export default class ProductManager {

    addProduct = async (product) => {    
        let result = await productsModel.create(product)
        return result
    }

    getProducts = async (limit = 3, page = 1, sort = 0, whereOptions) => {
        let result = await productsModel.paginate( whereOptions,{
           limit: limit,
           page: page,
           sort: { price: sort } 
        });
        return result
    }

    getAllProducts = async () => {
        let result = await productsModel.find();
        return result
    }

    getProductById = async (id) => {
        let result = await productsModel.findOne({_id: id})
        return result 
    }

    updateProduct = async (id, element) => {
        let result = await productsModel.updateOne(
            {_id: id},
            { $set: element}
        );
        return result 
    }

    deleteProduct = async (id) => {
        let result = await productsModel.deleteOne({_id: id})
        return result 
    }

    paginateProducts = async (page, email) => {
        if(!page) page=1;
        let result = await productsModel.paginate({},{page,limit:5,lean:true})
        let user = await userModel.find({email: email}).lean();
        let cart = await cartModel.findOne({_id: user[0].cart}).lean();
        result.user = user
        result.prevLink = result.hasPrevPage?`/views/products?page=${result.prevPage}`:'';
        result.nextLink = result.hasNextPage?`/views/products?page=${result.nextPage}`:'';
        result.isValid = !(page <= 0 || page > result.totalPages)
        result.isAuth = !(result.user == null)
        result.isAdmin = !(result.user[0].role != 'admin');
        result.isPremiun = !(result.user[0].role != 'premiun');
        result.cart = result.user[0].cart;
        result.qty = 0;
        cart.products.forEach(element => {
            result.qty += element.qty;
        });
        result.userId = result.user[0]._id;
        result.docs.forEach(element => {
            element['cart'] = result.user[0].cart;
            element['admin'] = result.isAdmin;
            element['premiun'] = result.isPremiun;
        });
        return result;
    }

    mockingProducts = async () => {
        for(let i = 0; i < 5; i++){
            await productsModel.create(generateProducts());
        }
    }
}





