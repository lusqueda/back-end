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

    getProducts = async () => {
       let result = await productsModel.find({}).lean()
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





