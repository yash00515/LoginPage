const Product = require("../Models/ProducSchema");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.render("productList", { products });
};

exports.addProduct = async (req, res) => {
  const { name, price, description, image } = req.body;
  await Product.create({ name, price, description, image });
  res.redirect("/products");
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
};

exports.getEditProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("editProduct", { product });
};
exports.postEditProduct = async (req, res) => {
  const { name, price, description, image } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price, description, image });
  res.redirect("/products");
};
