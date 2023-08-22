import MockingService from "../services/mocking.services.js";

export default class MockingController {
    constructor(){
        this.mockingService = new MockingService()   
    }

    mockingProductsController = async () => {
        const result = this.mockingService.mockingProductsService()
        return result;
    }

}    