import express from "express"
import handlebars from "express-handlebars"
import path from "path"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'

import { __dirname, connectMongo } from "./utils/index.js"
import { productsRouter } from "./routes/products.js"
import { productsRouterView } from "./routes/product.view.js"
import cartRouter from "./routes/carts.js"
import { cartRouterView } from "./routes/cart.view.js"
import { authRouter } from './routes/auth.js'
import { iniPassport } from './config/passport.js'
import { checkAuth, passportCall } from "./middlewares/index.js"

const app = express();
const PORT = 8080;

connectMongo()

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../public")))
app.use(cookieParser())
app.use(session({
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://d86webs:Diego859@cluster0.ahna6cz.mongodb.net/ecommerce', ttl: 3600 }),
  secret: 'secretCode',
  resave: true,
  saveUninitialized: true
}))

// PASSPORT
iniPassport();
app.use(passport.initialize());
// app.use(passport.session());

// HANDLEBARS
app.engine("handlebars", handlebars.engine())
app.set("views", path.join(__dirname, "../views"))
app.set("view engine", "handlebars")

// ROUTES APIS
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter);

//ROUTES VIEWS
app.use("/products", productsRouterView)
app.use("/carts", cartRouterView)
app.use('/auth', authRouter)
app.get('/', (_, res) =>  res.redirect('/auth/login'))

// app.use('/api/jwt-login', (req, res) => {
//   const { email, password } = req.body
//   console.log(email, password)
//   if(email == 'd86webs@gmail.com' && password == '123456') {
//     const token = jwt.sign({ email, role: 'admin'}, SECRET, { expiresIn: '24h' })
//     console.log('Logueado')
//     return res.status(200).cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
//     .json({
//       status: 'success',
//       msg: 'Login success!',
//       payload: {}
//     })
//   } else {
//     return res.status(400).json({
//       status: 'error',
//       msg: 'No se puede ingresar',
//       payload: {}
//     })
//   }
// })

// app.use('/api/jwt-profile', (req, res) => {
//   const token = req.headers['authorization'].split(' ')[1]
//   console.log(token)

//   try {
//     const decoded = jwt.verify(token, SECRET)
//     return res.status(200).json({
//       status: 'success',
//       msg: 'Este es el perfil',
//       payload: decoded
//     })
//   } catch (error) {
//     return res.status(401).json({
//       status: 'error',
//       msg: 'Unauthorized',
//       payload: {}
//     })
//   }
// })

// app.get('/api/jwt-profile', passportCall('jwt'), checkAuth('admin'), (req, res) => {
//   console.log('hola api')
//   res.send(req.user)
// })

// app.get('/', (req, res) => {
//   return res.render('login')
// })

// 404
app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Página no encontrada"
  })
})

// LISTEN
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
});