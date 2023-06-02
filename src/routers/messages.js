import Router from 'express'
import {MessageModel} from './../dao/models/mongoDB/messages.js'

const messagesRouter = Router()

messagesRouter.get('/', async (req, res) => {
    const messages = await MessageModel.find()
    res.status(200).send({ 
        "status": "success",
        "payload": messages 
    })
})

messagesRouter.post('/', async (req, res) => {
    const message = req.body
    const resp = await MessageModel.create(message)
    res.status(200).send({
        "status": "success",
        "message": resp
    })
})

export default messagesRouter