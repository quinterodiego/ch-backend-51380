import { TicketModel } from './models/ticket.model.js'

export default class TicketMongoDB {

    create = async (ticket) => {
        const resp = await TicketModel.create(ticket)
        return resp
    }

}