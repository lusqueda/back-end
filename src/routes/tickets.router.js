import { Router } from "express";
import TicketController from "../controllers/tickets.controller.js";
import passport from "passport";
import _ from "mongoose-paginate-v2";

const router = Router();
const ticketController = new TicketController()

router.get("/",
    passport.authenticate('jwt',{session: false}),
    ticketController.getTicketsController
);

router.get("/user/:uid",
    passport.authenticate('jwt',{session: false}),
    ticketController.getTicketByIdLeanController
);

router.get("/:tid", 
    passport.authenticate('jwt',{session: false}),
    ticketController.getTicketByIdController
);

export default router;