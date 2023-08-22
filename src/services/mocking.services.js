import ProductManager from "../daos/mongodb/ProductManager.js";

export default class MockingService {
    constructor(){
        this.productDao = new ProductManager();
    }

    mockingProductsService = async () => {
        const result = await this.productDao.mockingProducts()
        return result;
    }

}