import { Ticket } from "./../dao/factory.js";
const ticket = new Ticket()

class TicketService {

    create = async (newTicket) => {
        const resp = await ticket.create(newTicket)
        return resp
    }

}

export const ticketService = new TicketService()