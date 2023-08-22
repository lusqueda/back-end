import { Router } from "express";
import MockingController from "../controllers/mocking.controller.js";

const router = Router();
const mockingController = new MockingController()


router.get("/products", async(req, res) => {
    await mockingController.mockingProductsController();
    res.send({status: 'Se crearon los productos'})
})
   
export default router;