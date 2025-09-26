const cartModel = require("../model/cartModel");
const orderModel = require("../model/orderModel");
const productModel = require("../model/productModel");

exports.addToCart = (req, res) => {
  const uid = req.user.userid;
  const { pid } = req.params;
  const {quantity} = req.body;

  cartModel.checkCart(pid, uid, (err, i) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (i.length > 0) {
      const item = i[0];
      const qty = item.quantity + quantity;
      return cartModel.updateQty(uid, pid, qty, (err, i) => {
        if (err) {
          return res.status(500).json({ message: err });
        }

        if (i.affectedRows === 0) {
          console.log("masuk affecteed")
          return res.status(404).json({ message: "Item not found!" });
        }
        console.log("masuk berhsail")
        return res.status(200).json({ message: "Added to cart!" });
      });
    }

    cartModel.addToCart(uid, pid, quantity, (err) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      return res.status(201).json({ message: "Added to cart successfully!" });
    });
  });
};

exports.showCart = (req, res) => {
  const uid = req.user.userid;

  cartModel.showItemCart(uid, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Cart is empty!" });
    }

    const items = result.reduce((acc, row) => {
      let item = acc.find((p) => p.username == row.username);
      if (!item) {
        item = {
          username: row.username,
          product: [],
        };
        acc.push(item);
      }

      item.product.push({
        id: row.id,
        pid: row.product_id,
        name: row.name,
        price: row.price,
        stock: row.stock,
        quantity: row.quantity,
        images: row.images
      });
      return acc;
    }, []);

    return res.status(200).json({ items });
  });
};

exports.updateQty = (req, res) => {
  const uid = req.user.userid;
  const { pid } = req.params;
  const qty = req.body.qty;

  cartModel.getQty(pid, uid, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Not Found!" });
    }

    const { product_id, stock } = result[0];
    if (stock < qty) {
      return res.status(400).json({ message: "Stock Exceeded!" });
    }

    if (qty === 0) {
      return cartModel.removeItem(pid, uid, (err, result1) => {
        if (err) {
          return res.status(500).json({ message: err });
        }

        if (result1.affectedRows === 0) {
          return res.status(404).json({ message: "Failed to remove item!" });
        }
        return res.status(200).json({ message: "Item Removed!" });
      });
    }

    cartModel.updateQty(uid, pid, qty, (err, result2) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      if (result2.affectedRows === 0) {
        return res.status(404).json({ message: "Failed to update quantity!" });
      }
      return res.status(200).json({ message: "Quantity Updated!" });
    });
  });
};

exports.checkoutDet = (req, res) => {
  const uid = req.user.userid;
  const { cid } = req.body;
  console.log(cid);

  if (!Array.isArray(cid) || cid.length === 0) {
    return res.status(400).json({ message: "No items selected for checkout" });
  }
  cartModel.checkoutDetails(cid, uid, (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: err });

    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Cart items not found" });
    }
    for (let r of result) {
      if (r.quantity > r.stock) {
        return res
          .status(400)
          .json({ message: `Stock not enough for product ${r.product_id}` });
      }
    }
    const total = result.reduce((acc, i) => acc + i.price * i.quantity, 0);

    const items = result.reduce((acc, row) => {
      let item = acc.find((p) => (p.seller = row.seller));
      if (!item) {
        item = {
          seller: row.seller,
          product: [],
        };
        acc.push(item);
      }

      item.product.push({
        product_id: row.product_id,
        name: row.name,
        price: row.price,
        images: row.images,
        quantity: row.quantity,
      });
      return acc;
    }, []);

    return res.status(200).json({ message: "Checkout Details:", items, total });
  });
};

exports.checkout = (req, res) => {
  const uid = req.user.userid;
  const { cid } = req.body;

  if (!Array.isArray(cid) || cid.length === 0) {
    return res.status(400).json({ message: "No items selected for checkout" });
  }

  cartModel.checkoutDetails(cid, uid, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (result.length === 0) {
      console.log("error di cd")
      return res.status(404).json({ message: "Cart items not found" });
    }

    for (let r of result) {
      if (r.quantity > r.stock) {
        return res
          .status(400)
          .json({ message: `Stock not enough for product ${r.product_id}` });
      }
    }

    const total = result.reduce((acc, i) => acc + i.price * i.quantity, 0);

    orderModel.create(uid, total, (err, result1) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      const oid = result1.insertId;
      const dvalues = result.map((i) => [
        oid,
        i.product_id,
        i.quantity,
        i.price,
      ]);

      orderModel.createDetails(dvalues, (err) => {
        if (err) {
          return res.status(500).json({ message: err });
        }

        result.forEach((i) => {
          productModel.minStock(i.quantity, i.product_id, (err) => {
            if (err) {
              console.log(`Failed to update stock for ${i.product_id}`);
            }
          });
        });

        cartModel.removeItemByCID(cid, uid, (err,row) => {
          if (err) {
            return res.status(500).json({ message: err });
          }

          if(row.affectedRows == 0){
            console.log("error di ri")
            return res.status(404).json({message: "Not Found"})
          }
          return res
            .status(200)
            .json({ message: "Checkout Success", orderid: oid, total });
        });
      });
    });
  });
};

exports.deleteCart = (req, res) => {
  const uid = req.user.userid
  const {pid} = req.params

  cartModel.removeItem(pid, uid, (err) =>{
    if(err){
      return res.status(500).json({message: err})
    }

    return res.status(200).json({message: "Removed From Cart!"})
  })
}