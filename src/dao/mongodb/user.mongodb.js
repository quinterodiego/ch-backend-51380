import { UserModel } from "./models/user.model.js";
// import ProductDTO from './../DTO/products.dto.js'

export default class UserMongoDB {

    create = async (user) => {
        const resp = await UserModel.create(user)
        return resp
    }

    findByEmail = async (email) => {
        const resp = await UserModel.findOne({ email: email })
        return resp
    }
}