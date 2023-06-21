import express from 'express'

export const authRouter = express.Router()

authRouter.get('/login', (req, res) => {
    return res.render('login', {})
})

authRouter.get('/register', (req, res) => {
    return res.render('register', {})
})