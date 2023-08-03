import ProductManager from "../daos/mongodb/ProductManager.js";
import CartService from "./carts.services.js";

export default class ProductService {
    constructor(){
        this.cartService = new CartService(),
        this.productDao = new ProductManager()
    }

    addProductService = async (product) => {
        let result = await this.productDao.addProduct(product)                                                                                                                   )
        return result;
    }

    getProductsService = async (filter = null, filterValue = null) => {
        let whereOptions = {}
        if(filter != '' && filterValue != ''){
            whereOptions = { [filter]: filterValue };
        }       
        let result = await this.productDao.getProducts(limit = 3, page = 1, sort = 0, whereOptions)
        return result;
    }

    getProductByIdService = async (id) => {
        let result = await this.productDao.getProductById(id)                                                                                                                   )
        return result;
    }
}
