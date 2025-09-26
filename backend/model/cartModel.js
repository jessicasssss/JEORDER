const db = require('./database');

const cartModel = {
    addToCart: (id, pid, qty, callback) => {
        const sql = `INSERT INTO mscart (user_id, product_id, quantity) VALUES (?, ?, ?)`;
        db.query(sql, [id, pid, qty], callback);
    },

    checkCart: (pid, uid, callback) =>{
        const sql = `SELECT * FROM mscart WHERE user_id = ? AND product_id =?`
        db.query(sql, [uid, pid], callback)
    },

    showItemCart: (id, callback) => {
        const sql = `
        SELECT c.id, c.product_id, u.username, p.name, p.price, p.stock, c.quantity, (pi.image_url) AS images FROM mscart c JOIN msproduct p
        ON p.id = c.product_id
        JOIN msuser u
        ON p.seller = u.id
        JOIN product_images pi
        ON pi.product_id = c.product_id
        WHERE c.user_id = ?
        GROUP BY c.id, u.username, p.name, p.price, c.quantity;`
        db.query(sql, [id], callback);
    },

    getQty: (id, uid, callback) => {
        const sql = `SELECT c.product_id, c.quantity, p.stock FROM mscart c JOIN msproduct p ON p.id = c.product_id  WHERE c.product_id =? AND c.user_id =?`;
        db.query(sql, [id, uid], callback);
    },


    updateQty: (uid, pid, qty, callback) => {
        const sql = `UPDATE mscart SET quantity = ? WHERE product_id = ? AND user_id = ?`;
        db.query(sql, [qty, pid, uid], callback);
    },

    removeItem: (pid, uid, callback) =>{
        const sql = `DELETE FROM mscart WHERE product_id IN (?) AND user_id =?`;
        db.query(sql, [pid, uid], callback);
    },

    removeItemByCID: (cid, uid, callback) =>{
        const sql = `DELETE FROM mscart WHERE id IN (?) AND user_id =?`;
        db.query(sql, [cid, uid], callback);
    },


    checkoutDetails: (cid, uid, callback) => {
        const sql =   `SELECT c.id, c.product_id, c.quantity, p.name, p.price, p.stock, (po.image_url) AS images, (u.username) AS seller FROM mscart c
        JOIN msproduct p ON p.id = c.product_id
        JOIN msuser u ON p.seller = u.id
        JOIN product_images po ON c.product_id = po.product_id
        WHERE c.user_id = ? AND c.id IN(?)
        GROUP BY c.id, c.product_id`
        db.query(sql, [uid, cid], callback)
    },

}

module.exports = cartModel;