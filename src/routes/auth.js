import express from 'express'
import { UserModel } from './../dao/models/user.js';

export const authRouter = express.Router()

authRouter.get('/login', async (req, res) => {
    res.render('login', {})
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    const findUser = await UserModel.findOne({ email: email })
    if(findUser && findUser.password == password) {
        req.session.email = findUser.email
        req.session.isAdmin = findUser.isAdmin
        return res.redirect('/auth/perfil')
    } else {
        return res.status(401).render('error', { error: 'Email o password incorrectos' })
    }
})

authRouter.get('/perfil', (req, res) => {
    const user = { email: req.session.email, isAdmin: req.session.isAdmin }
    res.render('perfil', {user: user})
})

authRouter.get('/register', (req, res) => {
    res.render('register', {})
})

authRouter.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    const resp = await UserModel.create({ firstname, lastname, email, password, isAdmin: false })
    res.send(resp)
})