const express = require('express');
const route = express();
const orderCon = require("../controller/orderController")
const token = require("../middleware/tokenAuth")

route.get("/admin/allorder", token, orderCon.viewOrderAdmin)
route.get("/user/allorder", token, orderCon.viewOrderUser)

route.patch("/admin/status/:oid", token, orderCon.updateStatusAdmin)
route.patch("/user/status/:oid", token, orderCon.updateStatusUser)


module.exports = route