const orderModel = require("../model/orderModel");

exports.viewOrderAdmin = (req, res) => {
  const uid = req.user.userid;
  const role = req.user.role;

  if (role !== "admin") {
    return res.status(403).json({ message: "Unauthorized!" });
  }

  orderModel.viewOrderAdmin(uid, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (result.length === 0) {
      return res.status(404).json(null);
    }

    return res.status(200).json({ message: result });
  });
};

exports.viewOrderUser = (req, res) => {
  const uid = req.user.userid;
  const role = req.user.role;

  if (role !== "user") {
    return res.status(403).json({ message: "Unauthorized!" });
  }

  orderModel.viewOrderUser(uid, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (result.length === 0) {
      return res.status(404).json(null);
    }

    return res.status(200).json({ message: result });
  });
};

exports.updateStatusUser = (req, res) => {
  const role = req.user.role;
  const { oid } = req.params;

  if (role !== "user") {
    return res.status(403).json({ message: "Unauthorized!" });
  }

  orderModel.statusReceived(oid, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Not found!" });
    }

    return res.status(200).json({ message: "Status Updated to Received" });
  });
};

exports.updateStatusAdmin = (req, res) => {
  const role = req.user.role;
  const { oid } = req.params;

  console.log(role);
  if (role !== "admin") {
    return res.status(403).json({ message: "Unauthorized!" });
  }

  orderModel.statusShipped(oid, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Not found!" });
    }

    return res.status(200).json({ message: "Status Updated to Shipped" });
  });
};
