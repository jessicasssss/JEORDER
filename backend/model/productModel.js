const { viewAllProduct } = require('../controller/productController');
const db = require('./database');

const productModel = {

    addProduct: (nameP, description, price, stock, seller, callback) => {
        const sql = `INSERT INTO msproduct (name, description, price, stock, seller) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [nameP, description, price, stock, seller], callback);
    },

    insertImageProduct: (records, callback) => {
        const sql = `INSERT INTO product_images (product_id, image_url) VALUES ?`;
        db.query(sql, [records], callback);
    },

    productByAdmin: (id, callback) => {
        const sql = `SELECT mp.*, img.image_url FROM msproduct mp LEFT JOIN product_images img ON mp.id = img.product_id WHERE mp.seller = ?`;
        db.query(sql, [id], callback);
    },

    updateProduct: (id, updates, callback) => {
        if(Object.keys(updates).length === 0){
            return callback("No Fields to be updated!");
        }

        const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        const values = Object.values(updates);
        values.push(id);

        const sql =  `UPDATE msproduct SET ${fields} WHERE id = ?`;

        db.query(sql, values, callback);
    },

    deleteImg: (pid, callback) => {
        const sql = `DELETE from product_images WHERE product_id = ?`
        db.query(sql, [pid], callback);
    },

    insertImg: (records, callback) => {
        const sql = `INSERT INTO product_images (product_id, image_url) VALUES ?`
        db.query(sql, [records], callback)
    },

    deleteProduct: (pid, uid, callback) => {
        const sql = `DELETE FROM msproduct WHERE id = ? AND seller = ?`;
        db.query(sql, [pid, uid], callback);
    },

    findImg: (pid, callback) => {
        const sql = `SELECT image_url FROM product_images WHERE product_id = ?`;
        db.query(sql, [pid], callback);
    },

    viewAllProduct:(callback) => {
        const sql = `SELECT mp.*, img.image_url FROM msproduct mp LEFT JOIN product_images img ON mp.id = img.product_id`;
        db.query(sql, callback);
    },

    detailProduct: (pid, callback) => {
        const sql = `SELECT mp.*, u.username, GROUP_CONCAT(img.image_url) AS image_url FROM msproduct mp JOIN product_images img ON mp.id = img.product_id JOIN msuser u ON u.id = mp.seller 
        WHERE mp.id =? `;
        db.query(sql, [pid], callback)
    },

    minStock: (qty, pid, callback) =>{
        const sql = `UPDATE msproduct SET stock = stock - ? WHERE id =?`
        db.query(sql, [qty, pid], callback)
    }

}

module.exports = productModel;
