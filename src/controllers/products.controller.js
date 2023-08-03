import ProductService from "../services/products.services.js";

export default class ProductController {
    constructor(){
        this.productService = new ProductService()   
    }

    addProductContoller = async (product) => {
        const result = this.productService.addProductService(product)
        return result;
    }

    getProductsController = async () => {
        const result = this.productService.getProductsService()
        return result;
    }

    getProductByIdContoller = async (id) => {
        const result = this.productService.getProductByIdService(id)
        return result;
    }

}    