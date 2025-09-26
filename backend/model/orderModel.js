const db = require("./database");

const orderModel = {
  create: (uid, total, callback) => {
    const sql = `INSERT INTO msorder (user_id, total_price) VALUES (?,?)`;
    db.query(sql, [uid, total], callback);
  },

  createDetails: (values, callback) => {
    const sql = `INSERT INTO msorderdetail (order_id, product_id, quantity, price) VALUES ?`;
    db.query(sql, [values], callback);
  },

  viewOrderAdmin: (uid, callback) => {
    const sql = `SELECT od.id, u.username, p.name, od.quantity, od.price, o.total_price, (po.image_url) AS image, od.status, o.created_at FROM msorder o
        JOIN msorderdetail od ON od.order_id = o.id
        JOIN msproduct p ON p.id = od.product_id
        JOIN msuser u ON u.id = o.user_id
        JOIN product_images po ON po.product_id = p.id
        WHERE p.seller = ?
        GROUP BY p.id, u.username, p.name
        `;
    db.query(sql, [uid], callback);
  },

  viewOrderUser: (uid, callback) => {
    const sql = `SELECT od.id, u.username, p.name, od.quantity, od.price, o.total_price, (po.image_url) AS image, od.status, o.created_at FROM msorder o
        JOIN msorderdetail od ON od.order_id = o.id
        JOIN msproduct p ON p.id = od.product_id
        JOIN msuser u ON u.id = p.seller
        JOIN product_images po ON po.product_id = p.id
        WHERE o.user_id = ?
        GROUP BY p.id, u.username, p.name
        `;
    db.query(sql, [uid], callback);
  },

  statusShipped: (oid, callback) => {
    const sql = `UPDATE msorderdetail SET status = 'SHIPPED' WHERE id =? AND status = 'PAID'`;
    db.query(sql, [oid], callback);
  },

  statusReceived: (oid, callback) => {
    const sql = `UPDATE msorderdetail SET status = 'RECEIVED' WHERE id =? AND status = 'SHIPPED'`;
    db.query(sql, [oid], callback);
  },
};

module.exports = orderModel;
