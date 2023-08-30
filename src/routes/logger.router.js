import { Router } from "express";

const router = Router();

router.get("/", async(req, res) => {
    req.logger.error("alerta error")
    req.logger.warn("alerta warn")
    req.logger.info("alerta info")
    req.logger.http("alerta http")
    req.logger.debug("alerta debug")
    res.send({ message: 'prueba de logger'})
})
   
export default router;