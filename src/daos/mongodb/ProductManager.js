import mongoose from "mongoose";
import { productsModel } from "./models/products.model.js";
import { userModel } from "./models/users.model.js";
import envConfig from "../../config/env.config.js";

export default class ProductManager {

    connection = mongoose.connect(
        envConfig.mongoUrl
    );

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

    deleteProduct = async (code) => {
        let result = await productsModel.deleteOne({code: code})
        return result 
    }

    paginateProducts = async (page, email) => {
        if(!page) page=1;
        let result = await productsModel.paginate({},{page,limit:5,lean:true})
        let user = await userModel.find({email: email}).lean();
        result.user = user
        result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}`:'';
        result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}`:'';
        result.isValid = !(page <= 0 || page > result.totalPages)
        result.isAuth = !(result.user == null)
        result.isAdmin = !(user[0].role != 'on')
        return result;
    }

}





