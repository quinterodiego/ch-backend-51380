import express from "express";
import handlebars from "express-handlebars"
import path from "path"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport';

import { __dirname, connectMongo } from "./utils/index.js"
import { productRouter } from "./routes/product.js"
import { productRouterView } from "./routes/product.view.js"
import cartRouter from "./routes/carts.js"
import { cartRouterView } from "./routes/cart.view.js"
import { authRouter } from './routes/auth.js'
import { iniPassport } from './config/passport.js';

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
// PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());


// HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "handlebars");

// ROUTES APIS
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

//ROUTES VIEWS
app.use("/products", productRouterView);
app.use("/carts", cartRouterView);
app.use('/auth', authRouter)
app.get('/', (req, res) =>  res.redirect('/auth/login'))

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