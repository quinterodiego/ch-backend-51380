import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { __dirname, connectMongo } from "./utils.js";
import { productRouter } from "./routes/product.js";
import { productRouterView } from "./routes/product.view.js";
import cartRouter from "./routes/carts.js";
import { cartRouterView } from "./routes/cart.view.js";

const app = express();
const PORT = 8080;

connectMongo();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// ROUTES APIS
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// ROUTES VIEWS
app.use("/products", productRouterView);
app.use("/carts", cartRouterView);

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