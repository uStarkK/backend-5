import express from "express";
import { productsRouter } from "./routes/products_router.js";
import { cartRouter } from "./routes/cart_router.js";
import path from "path";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars"
import { productsRender } from "./routes/ProductsRender.js";
import { realTimeProducts } from "./routes/RealTimeProducts.js"
import { startSocket } from "./socket.js";
const PORT = 8080


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static("src/public"));

app.engine("handlebars", handlebars.engine());

app.set("views", path.join(__dirname, "views"))

app.set("view engine", "handlebars")

const httpServer = app.listen(PORT, () => {console.log(`Server on! Listening on localhost:${PORT}`)})




// API ROUTES
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)


// HTML RENDER

app.use("/", productsRender)


// SOCKETS ROUTE

app.use("/realTimeProducts", realTimeProducts)

startSocket(httpServer)

app.get("*", (req, res, next) => {
    res.status(404).json({ status: "error", msg: "Route not found", data: {} })
})




