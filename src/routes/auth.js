import express from 'express'
import passport from 'passport'
import { UserModel } from './../dao/models/user.js';
import { isUser, isAdmin } from '../middlewares/index.js';
import { createHash, isValidPassword } from '../utils/index.js'

export const authRouter = express.Router()

authRouter.get('/login', async (req, res) => {
    res.render('login', {})
})

authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), async (req, res) => {
    if (!req.user) {
        return res.json({ error: 'invalid credentials' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstname: req.user.firstname, lastname: req.user.lastname, isAdmin: req.user.isAdmin };

    return res.redirect('/products')
})

authRouter.get('/faillogin', async (req, res) => {
    return res.json({ error: 'fail to login' });
});

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

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), (req, res) => {
    if(!req.user) {
        return res.json({ error: 'Something went wrong'})
    }

    req.session.user = {
        _id: req.user._id,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        idAdmin: req.user.isAdmin
    }

    return res.json({ status: 'success', payload: req.user })
})

authRouter.get('/failregister', async (req, res) => {
    return res.json({ error: 'fail to register' });
  });

authRouter.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return res.status(500).render('error', { error: 'No se pudo cerrar la sesión ' })
        }

        return res.redirect('/auth/login')
    })
})

authRouter.get('/session', (req, res) => {
    return res.send(JSON.stringify(req.session));
});