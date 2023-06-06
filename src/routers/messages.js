import Router from 'express'
import { getMessages, createMessage } from './../controllers/messages.js'
const messagesRouter = Router()

messagesRouter.get('/', getMessages)

messagesRouter.post('/', createMessage)

export default messagesRouter