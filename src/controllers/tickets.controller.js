import TicketService from "../services/tickets.services.js";

export default class TicketController {
    constructor(){
        this.ticketService = new TicketService()   
    }

    getTicketByIdController = async(id) => {
        const result = await this.ticketService.getTicketByIdService(id)
        return result;
    }

    getTicketByIdLeanController = async(id) => {
        const result = await this.ticketService.getTicketByIdLeanService(id)
        return result;
    }

    getTicketsController = async() => {
        const result = await this.ticketService.getTicketsService()
        return result;
    }

    paginateTicketsController = async (page, email) => {
        const result = this.ticketService.paginateTicketsService(page, email)
        return result;
    } 

   

}