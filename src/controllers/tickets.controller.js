import TicketService from "../services/tickets.services.js";

export default class TicketController {
    constructor(){
        this.ticketService = new TicketService()   
    }

    getTicketByIdController = async(req,res)=>{
        const id = req.params.tid;
        const ticket = await this.ticketService.getTicketByIdService(id)
        res.send({ status: 'Ticket encontrado', ticket: ticket });
    }

    getTicketByIdLeanController = async (req,res)=>{ 
        const id = req.params.uid;
        const tickets = await this.ticketService.getTicketByIdLeanService(id);
        res.send(tickets);
    }
   
    getTicketsController = async (req,res)=>{ 
        const tickets = await this.ticketService.getTicketsService();
        res.send(tickets)
    }
    
    paginateTicketsController = async (page, email) => {
        const result = this.ticketService.paginateTicketsService(page, email)
        return result;
    }   

}