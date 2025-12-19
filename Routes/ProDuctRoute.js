const express = require("express");
const router = express.Router();

const Product = require("../Models/ProducSchema");
const authMiddleware = require("../Middleware/AuthMiddleware");

router.get("/products/add", authMiddleware, (req, res) => {
  res.render("addProduct");
});

router.post("/products/add", authMiddleware, async (req, res) => {
  const { name, price, description, image } = req.body;
  await Product.create({ name, price, description, image });
  res.redirect("/products");
});

router.get("/products", authMiddleware, async (req, res) => {
  const products = await Product.find();
  res.render("productList", { products });
});

router.get("/products/delete/:id", authMiddleware, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});

router.get("/product/edit/:id", authMiddleware, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("editProduct", { product });
});

router.post("/product/edit/:id", authMiddleware, async (req, res) => {
  const { name, price, description, image } = req.body;
  await Product.findByIdAndUpdate(req.params.id, {
    name,
    price,
    description,
    image
  });
  res.redirect("/products");
});

module.exports = router;
