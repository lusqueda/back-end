import TicketManager from "../daos/mongodb/TicketManager.js";

export default class TicketService {
    constructor(){
        this.ticketDao = new TicketManager()
    }

    getTicketByIdService = async (id) => {
        const result = await this.ticketDao.getTicketById(id)
        return result;
    }

    getTicketByIdLeanService = async (id) => {
        const result = await this.ticketDao.getTicketByIdLean(id)
        return result;
    }

    getTicketsService = async () => {
        const result = await this.ticketDao.getTickets()
        return result;
    }

    paginateTicketsService = async (page, email) => {
        const result = await this.ticketDao.paginateTickets(page, email)
        return result;
    }

}