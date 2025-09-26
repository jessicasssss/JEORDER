const express = require("express");
const cartCon = require("../controller/cartController");
const route = express.Router();
const token = require("../middleware/tokenAuth");

route.post("/cart/add/:pid", token, cartCon.addToCart);
route.get("/cart/view-all", token, cartCon.showCart);
route.patch("/cart/update/qty/:pid", token, cartCon.updateQty);
route.post("/checkout/details", token, cartCon.checkoutDet);
route.post("/checkout/order", token, cartCon.checkout);
route.delete("/cart/delete/:pid", token, cartCon.deleteCart);

module.exports = route;

