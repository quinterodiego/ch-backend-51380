import {MessageModel} from './../dao/models/mongoDB/messages.js'

export const getMessages =  async (req, res) => {
    const messages = await MessageModel.find()
    res.status(200).send({ 
        "status": "success",
        "payload": messages 
    })
}

export const createMessage = async (req, res) => {
    const message = req.body
    const resp = await MessageModel.create(message)
    res.status(200).send({
        "status": "success",
        "message": resp
    })
}