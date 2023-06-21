import express from 'express'
import { UserModel } from './../dao/models/user.js';
import { isUser, isAdmin } from '../middlewares/index.js';

export const authRouter = express.Router()

authRouter.get('/login', async (req, res) => {
    res.render('login', {})
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        return res.status(400).render('error', { error: 'Debe completar todos los campos' })

    }
    const findUser = await UserModel.findOne({ email: email })
    if(findUser && findUser.password == password) {
        req.session.firstname = findUser.firstname
        req.session.lastname = findUser.lastname
        req.session.email = findUser.email
        req.session.isAdmin = findUser.isAdmin
        return res.redirect('/products')
    } else {
        return res.status(401).render('error', { error: 'Email o password incorrectos' })
    }
})

authRouter.get('/perfil', isUser, (req, res) => {
    const user = { email: req.session.email, isAdmin: req.session.isAdmin }
    res.render('perfil', {user: user})
})

authRouter.get('/administracion', isUser, isAdmin, (req, res) => {
    
    res.send('Datos super secretos')
})

authRouter.get('/register', (req, res) => {
    res.render('register', {})
})

authRouter.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    if(!email || !password || !firstname || !lastname) {
        return res.status(400).render('error', { error: 'Debe completar todos los campos' })
    }

    try {
        await UserModel.create({ firstname, lastname, email, password, isAdmin: false })
        req.session.email = email
        req.session.isAdmin = false
        return res.redirect('/products')
    } catch (error) {
        console.log(error)
        return res.status(400).render('error', { error: 'No se pudo crear el usuario' })
    }
})

authRouter.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return res.status(500).render('error', { error: 'No se pudo cerrar la sesión ' })
        }

        return res.redirect('/login')
    })
})