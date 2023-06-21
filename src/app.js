import express from "express";
import handlebars from "express-handlebars"
import path from "path"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import { __dirname, connectMongo } from "./utils/index.js"
import { productRouter } from "./routes/product.js"
import { productRouterView } from "./routes/product.view.js"
import cartRouter from "./routes/carts.js"
import { cartRouterView } from "./routes/cart.view.js"
import { isAdmin } from './middlewares/index.js';
import { authRouter } from './routes/auth.js'

const app = express();
const PORT = 8080;

connectMongo();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(session({
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://d86webs:Diego859@cluster0.ahna6cz.mongodb.net/ecommerce', ttl: 3600 }),
  secret: 'secretCode',
  resave: true,
  saveUninitialized: true
}))

// HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "handlebars");

// ROUTES APIS
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// ROUTES VIEWS
app.use("/products", productRouterView);
app.use("/carts", cartRouterView);

app.use('/auth', authRouter)

// COOKIES
// app.get('/api/set-cookie', (req, res) => {
//   res.cookie('cookie01', 'informacion de la cookie01', { maxAge: 5000 })

//   return res.status(200).json({
//     status: 'success',
//     message: 'Cookie seteada!!',
//     data: {}
//   })
// })

// app.get('/api/get-cookie', (req, res) => {
//   console.log(req.cookies)

//   return res.status(200).json({
//     status: 'success',
//     message: 'Cookie seteada!!',
//     data: {}
//   })
// })

// SESSION
app.get('/session', (req, res) => {
  if(req.session.count) {
    req.session.count++
    res.send('Nos visitaste ' + req.session.count)
  } else {
    req.session.count = 1
    res.send('Nos visitaste ' + 1)
  }
})

// app.get('/login', (req, res) => {
//   const { username, password } = req.query
//   if(username !== 'diego' || password !== '123456') {
//     return res.send('Login failed!')
//   }

//   req.session.user = username
//   req.session.admin = true
//   res.send('Login success!')
// })

// app.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if(err) {
//       return res.json({ status: 'Logout ERROR', body: err })
//     }
//     res.send('Logout OK!')
//   })
// })

// 404
app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Página no encontrada"
  });
});

// LISTEN
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});