const productModel = require("../model/productModel");
const path = require("path");
const fs = require("fs");

exports.addProduct = (req, res) => {
  const userid = req.user.userid;
  const role = req.user.role;
  console.log(`${role}`);
  if (role === "user") {
    return res.status(403).json({ message: "You are not an admin!" });
  }

  const { nameP, description, price, stock } = req.body;
  const image = req.files;

  productModel.addProduct(
    nameP,
    description,
    price,
    stock,
    userid,
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      const productid = result.insertId;

      const imageRecords = image.map((file) => [
        productid,
        `/uploads/${file.filename}`,
      ]);

      productModel.insertImageProduct(imageRecords, (err1) => {
        if (err1) {
          return res.status(500).json({ message: err1.message });
        }
        return res
          .status(201)
          .json({ message: `${nameP}, stock: ${stock} is succesfully added!` });
      });
    }
  );
};

exports.viewAdminProduct = (req, res) => {
  const userid = req.user.userid;
  const role = req.user.role;
  console.log(`${role}`);
  if (role === "user") {
    return res.status(403).json({ message: "You are not an admin!" });
  }

  productModel.productByAdmin(userid, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (result.length === 0) {
      return res.status(404).json(null);
    }

    const products = result.reduce((acc, row) => {
      let product = acc.find((p) => p.id === row.id);
      if (!product) {
        product = {
          id: row.id,
          name: row.name,
          description: row.description,
          price: row.price,
          stock: row.stock,
          seller: row.seller,
          images: [],
        };
        acc.push(product);
      }
      if (row.image_url) {
        product.images.push(row.image_url);
      }
      return acc;
    }, []);
    res.json(products);
  });
};

exports.updateProduct = (req, res) => {
  const role = req.user.role;
  if (role === "user") {
    return res.status(403).json({ message: "You are not an admin!" });
  }

  const { id } = req.params;
  const updates = req.body;
  const images = req.files;

  productModel.updateProduct(id, updates, (err, result) => {
    if (err) {
      console.log("error di up");
      return res.status(500).json({ message: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Product with ${id} not found` });
    }

    if (!images || images.length === 0) {
      return res
        .status(200)
        .json({ message: "Product updated (no image changes)." });
    }

    productModel.findImg(id, (err, oldImages) => {
      if (err) {
        console.log("error di findimg");
        return res.status(500).json({ message: err });
      }

      oldImages.forEach((row) => {
        const imgPath = path.join(__dirname, "..", row.image_url);
        fs.unlink(imgPath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Error deleting file:", err);
          }
        });
      });

      productModel.deleteImg(id, (err) => {
        if (err) {
          console.log("error di dimg");
          return res.status(500).json({ message: err });
        }

        const imageRecords = images.map((file) => [
          id,
          `/uploads/${file.filename}`,
        ]);

        productModel.insertImg(imageRecords, (err) => {
          if (err) {
            console.error("Insert image error:", err);
          }
        });

        return res
          .status(200)
          .json({ message: "Product updated (with new images)." });
      });
    });
  });
};

exports.deleteProduct = (req, res) => {
  const uid = req.user.userid;
  const role = req.user.role;
  console.log(`${role}`);
  if (role === "user") {
    return res.status(403).json({ message: "You are not an admin!" });
  }

  const { pid } = req.params;

  console.log(`${uid} , ${pid}`);

  productModel.findImg(pid, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (result.length === 0) {
      return res.status(404).json("Images Not Found!");
    }

    result.forEach((row) => {
      const imgFile = row.image_url;
      const img_path = path.join(__dirname, "..", imgFile);
      fs.unlink(img_path, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting file:", err);
        }
      });
    });

    productModel.deleteProduct(pid, uid, (err, result1) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      if (result1.affectedRows === 0) {
        return res.status(404).json({ message: "Delete Unsuccessfull!" });
      }
      return res.status(200).json({ message: "Deleted Successfully!" });
    });
  });
};

exports.viewAllProduct = (req, res) => {
  productModel.viewAllProduct((err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "No Product!" });
    }

    const products = result.reduce((acc, row) => {
      let product = acc.find((p) => p.id === row.id);
      if (!product) {
        product = {
          id: row.id,
          name: row.name,
          description: row.description,
          price: row.price,
          stock: row.stock,
          seller: row.seller,
          images: [],
        };
        acc.push(product);
      }
      if (row.image_url) {
        product.images.push(row.image_url);
      }
      return acc;
    }, []);
    res.json(products);
  });
};

exports.detailProduct = (req, res) => {
  const { pid } = req.params;

  productModel.detailProduct(pid, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Product is not found!" });
    }

    const product = result[0];
    if (product.image_url) {
      product.image_url = product.image_url.split(",");
    } else {
      product.image_url = [];
    }

    return res.status(200).json({ result: product });
  });
};
