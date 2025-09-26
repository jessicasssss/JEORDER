const productCon = require('../controller/productController');
const token = require('../middleware/tokenAuth');
const express = require('express');
const multer = require('multer');
const path = require('path');
const route = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/"));
    },
    filename: (req, file, cb) => {
        const name = Date.now() + path.extname(file.originalname);
        cb(null, name);
    }
});

const upload = multer({storage});

route.post("/admin/product/add", token, upload.array('image', 4), productCon.addProduct);
route.get("/admin/product/view", token, productCon.viewAdminProduct);
route.patch("/admin/product/update/:id", token, upload.array('image', 4), productCon.updateProduct);
route.delete("/admin/product/delete/:pid", token, productCon.deleteProduct);

route.get("/product/view/:pid", token, productCon.detailProduct);
route.get("/product/all", token, productCon.viewAllProduct);

module.exports = route;