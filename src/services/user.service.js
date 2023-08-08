import { User } from "./../dao/factory.js";
const user = new User()

class UserService {

    create = async (newUser) => {
        const resp = await user.create(newUser)
        return resp
    }

    findByEmail = async (email) => {
        const resp = await user.findByEmail(email)
        return resp
    }

}

export const userService = new UserService()