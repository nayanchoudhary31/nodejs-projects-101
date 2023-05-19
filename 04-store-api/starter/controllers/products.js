const Products = require("../models/product");
const getAllStaticProducts = async (req, resp) => {
  const products = await Products.find({ featured: true });
  resp.status(200).json({ products: products, nbHits: products.length });
};

const getAllProducts = async (req, resp) => {
  const { featured } = req.query;
  let queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  const products = await Products.find(queryObject);
  resp.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllStaticProducts, getAllProducts };
