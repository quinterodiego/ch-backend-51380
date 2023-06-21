export const isAdmin = (req, res, next) => {
    if(req.session?.admin) {
        return next()
    }

    return res.status(401).send('Error de autorización')
}