import passport from "passport"

export const isAdmin = (req, res, next) => {
    if(req.session?.isAdmin) {
        return next()
    }

    return res.status(403).render('error', { error: 'Error de autorización' })
}

export const isUser = (req, res, next) => {
    if(req.session?.user?.email) {
        return next()
    }

    return res.status(401).render('error', { error: 'Error de autenticación' })
}

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        console.log('passportCall')
        passport.authenticate(strategy, (err, user, info) => {
            if(err) return next(err)
            if(!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }

            req.user = user
            next()
        })(req, res, next)
    }
}

export const checkAuth = (role) => {
    return async (req, res, next) => {
        if(!req.user) return res.status(401).send({ error: 'Unauthorized' })
        if(req.user.role != role) return res.status(403).send({ error: 'No permissions' })

        next()
    }
}