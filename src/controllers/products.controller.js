import ProductService from "../services/products.services.js";

export default class ProductController {
    constructor(){
        this.productService = new ProductService()   
    }

    addProductContoller = async (product) => {
        const result = this.productService.addProductService(product)
        return result;
    }

    getProductsController = async (limit, page, sort, filter, filterValue) => {
        const result = this.productService.getProductsService(limit, page, sort, filter, filterValue)
        return result;
    }

    getProductByIdContoller = async (id) => {
        const result = this.productService.getProductByIdService(id)
        return result;
    }

    updateProductController = async (id, element) => {
        const result = this.productService.updateProductService(id, element)
        return result;
    }

    deleteProductController = async (id) => {
        const result = this.productService.deleteProductService(id)
        return result;
    }

    paginateProductsController = async (page, email) => {
        const result = this.productService.paginateProductsService(page, email)
        return result;
    }

}    