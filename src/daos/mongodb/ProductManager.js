import mongoose from "mongoose";
import { productsModel } from "./models/products.model.js";


export default class ProductManager {

    connection = mongoose.connect(
        'mongodb+srv://CoderUser:CoderPassword@codercluster.z7uinu4.mongodb.net/?retryWrites=true&w=majority'
    );

    addProduct = async (product) => {
        let result = await productsModel.create(product)
        return result
    }

    getProducts = async (limit = 3, page = 1, sort = 0, filter = null, filterValue = null) => {
        let whereOptions = {}
        if(filter != '' && filterValue != ''){
            whereOptions = { [filter]: filterValue };
        }       
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

}





