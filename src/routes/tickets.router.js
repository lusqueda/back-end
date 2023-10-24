import { Router } from "express";
import TicketController from "../controllers/tickets.controller.js";
import passport from "passport";
import _ from "mongoose-paginate-v2";

const router = Router();
const ticketController = new TicketController()

router.get("/",
    passport.authenticate('jwt',{session: false}),
    async (req,res)=>{ 
        const tickets = await ticketController.getTicketsController();
        res.send(tickets)
})

router.get("/user/:uid",
    passport.authenticate('jwt',{session: false}),
    async (req,res)=>{ 
        const id = req.params.uid;
        const tickets = await ticketController.paginateTicketsController(id);
        res.render('tickets',tickets);
})

router.get("/:tid", 
    passport.authenticate('jwt',{session: false}),
    async(req,res)=>{
        const id = req.params.tid;
        const ticket = await ticketController.getTicketByIdController(id)
        res.send({ status: 'Ticket encontrado', ticket: ticket });
})

export default router;