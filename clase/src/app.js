import express from "express";
import { productRouter } from "./routes/product.js";
import handlebars from "express-handlebars";
import path from "path";
import { __dirname, connectMongo } from "./utils.js";
import cartRouter from "./routes/carts.js";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "no encontrado",
    data: {},
  });
});
